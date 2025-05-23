import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { userActions } from "entities/User";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByEmailProps {
  email: string;
  password: string;
}

enum ELoginByEmailStatusCode {
  UN_AUTH = 401
}

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(ELoginByEmailStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при авторизации. Попробуйте позже.');
    }
  },
);