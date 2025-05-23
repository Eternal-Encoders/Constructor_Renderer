import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

interface AddFloorProps {
  building_id: string;
  number: number;
  name: string;
}

enum EAddFloorStatusCode {
  UN_AUTH = 401
}

export const addFloor = createAsyncThunk<string, AddFloorProps, { rejectValue: string }>(
  "floor/addFloor",
  async (floorData, thunkAPI) => {
    try {
      const response = await axios.post<string>(`${import.meta.env.VITE_API_DOMAIN}/floor`, floorData);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EAddFloorStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при добавлении этажа. Попробуйте позже.');
    }
  },
);