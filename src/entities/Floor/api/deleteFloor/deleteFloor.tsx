import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { floorsSummaryActions } from "entities/FloorsSummary";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EDeleteFloorStatusCode {
  SUCCESS = 200,
  UN_AUTH = 401
}

export const deleteFloor = createAsyncThunk<void, string, { rejectValue: string }>(
  "floorInfo/deleteFloor",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/floor/${id}`);

      if (response.status !== EDeleteFloorStatusCode.SUCCESS) {
        throw new Error();
      }

      thunkAPI.dispatch(floorsSummaryActions.deleteFloor(id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EDeleteFloorStatusCode.UN_AUTH, thunkAPI, error);

      return thunkAPI.rejectWithValue('Ошибка при удалении данных. Попробуйте позже.');
    }
  },
);