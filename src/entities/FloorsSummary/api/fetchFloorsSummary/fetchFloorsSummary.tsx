import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { floorsSummaryActions } from "../../model/slice/floorsSummarySlice";
import { FloorSummary } from "../../model/types/floorsSummary";

enum EFetchFloorsStatusCode {
  UN_AUTH = 401
}

export const fetchFloorsSummary = createAsyncThunk<FloorSummary[], string, { rejectValue: string }>(
  "floorSummary/fetchFloorSummary",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<FloorSummary[]>(`${import.meta.env.VITE_API_DOMAIN}/building/${id}/floors`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(floorsSummaryActions.initFloors(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EFetchFloorsStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);