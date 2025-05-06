import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByEmailProps {
  email: string;
  password: string;
}

// enum LoginErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const loginByEmail = createAsyncThunk<string, LoginByEmailProps, { rejectValue: string }>(
  "login/loginByEmail",
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<string>
      (`${import.meta.env.VITE_API_DOMAIN}/user/login`, authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Вы ввели неверный email или пароль');
    }
  },
);