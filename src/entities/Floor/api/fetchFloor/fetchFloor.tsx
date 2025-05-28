import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { floorActions } from "entities/Floor/model/slice/floorSlice";
import { Floor } from "entities/Floor/model/types/floor";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EFetchFloorStatusCode {
  UN_AUTH = 401
}

export const fetchFloor = createAsyncThunk<Floor, string, { rejectValue: string }>(
  "floorInfo/fetchFloor",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<Floor>(`${import.meta.env.VITE_API_DOMAIN}/floor/${id}`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(floorActions.initFloor(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;
      
      redirectAndTokenDelete(EFetchFloorStatusCode.UN_AUTH, thunkAPI, error);

      return thunkAPI.rejectWithValue('Ошибка при удалении данных. Попробуйте позже.');
    }
  },
);