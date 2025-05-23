import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { userActions } from "entities/User";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface RegisterByEmailProps {
  email: string;
  password: string;
  nickname: string;
}

enum ERegisterByEmailStatusCode {
  UN_AUTH = 401
}

export const registerByEmail = createAsyncThunk<string, RegisterByEmailProps, { rejectValue: string }>(
  "register/registerByEmail",
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<string>
      (`${import.meta.env.VITE_API_DOMAIN}/user/register`, authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(ERegisterByEmailStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);