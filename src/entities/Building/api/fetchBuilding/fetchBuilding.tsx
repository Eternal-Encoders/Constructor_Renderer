import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { buildingActions } from "entities/Building/model/slice/buildingSlice";
import { Building } from "entities/Building/model/types/building";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EFetchBuildingStatusCode {
  UN_AUTH = 401
}

export const fetchBuilding = createAsyncThunk<Building, string, { rejectValue: string }>(
  "buildingInfo/fetchBuilding",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<Building>(`${import.meta.env.VITE_API_DOMAIN}/building/${id}`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(buildingActions.initBuilding(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;
      
      redirectAndTokenDelete(EFetchBuildingStatusCode.UN_AUTH, thunkAPI, error);

      return thunkAPI.rejectWithValue('Ошибка при удалении данных. Попробуйте позже.');
    }
  },
);