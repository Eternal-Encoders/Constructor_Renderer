import { GetThunkAPI } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function redirectAndTokenDelete(unAuthStatusCode: number, thunkAPI: GetThunkAPI<any>, error: AxiosError) {
  if (error.status === unAuthStatusCode) {
    console.log(12);
    window.location.href = '/auth';
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem(USER_LOCALSTORAGE_KEY); 
    return thunkAPI.rejectWithValue('Время сессии истекло. Пожалуйста, авторизуйтесь снова.');
  }
}