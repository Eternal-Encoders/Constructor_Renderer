import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { buildingsSummaryActions } from "../../model/slice/buildingsSummarySlice";
import { BuildingSummary } from "../../model/types/buildingsSummary";

enum EFetchBuildingsStatusCode {
  UN_AUTH = 401
}

export const fetchBuildingsSummary = createAsyncThunk<BuildingSummary[], string, { rejectValue: string }>(
  "buildingSummary/fetchBuildingSummary",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<BuildingSummary[]>(`${import.meta.env.VITE_API_DOMAIN}/project/${id}/buildings`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(buildingsSummaryActions.initBuildings(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EFetchBuildingsStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);