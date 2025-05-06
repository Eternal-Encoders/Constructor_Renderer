import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface RegisterByEmailProps {
  email: string;
  password: string;
  nickname: string;
}

// enum RegisterErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const registerByEmail = createAsyncThunk<string, RegisterByEmailProps, { rejectValue: string }>(
  "register/registerByEmail",
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<string>(`${import.meta.env.VITE_API_DOMAIN}/user/register`, authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Вы ввели неккоректный email или пароль');
    }
  },
);