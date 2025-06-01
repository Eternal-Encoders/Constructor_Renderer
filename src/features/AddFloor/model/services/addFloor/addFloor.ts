import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Floor, floorActions } from "entities/Floor";
import { floorsSummaryActions } from "entities/FloorsSummary";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

interface AddFloorProps {
  building_id: string;
  index: number;
  name: string;
}

enum EAddFloorStatusCode {
  UN_AUTH = 401
}

export const addFloor = createAsyncThunk<Floor, AddFloorProps, { rejectValue: string }>(
  "floor/addFloor",
  async (floorData, thunkAPI) => {
    try {
      const response = await axios.post<Floor>(`${import.meta.env.VITE_API_DOMAIN}/floor`, floorData);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(floorActions.initFloor(response.data));
      thunkAPI.dispatch(floorsSummaryActions.addFloor(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EAddFloorStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при добавлении этажа. Попробуйте позже.');
    }
  },
);