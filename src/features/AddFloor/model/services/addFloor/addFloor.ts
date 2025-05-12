import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AddFloorProps {
  building_id: string;
  number: number;
  name: string;
}

// enum RegisterErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const addFloor = createAsyncThunk<string, AddFloorProps, { rejectValue: string }>(
  "floor/addFloor",
  async (floorData, thunkAPI) => {
    try {
      const response = await axios.post<string>(`${import.meta.env.VITE_API_DOMAIN}/floor`, floorData);

      if (!response.data) {
        throw new Error();
      }

      // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      // thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Вы ввели неккоректное название или номер');
    }
  },
);