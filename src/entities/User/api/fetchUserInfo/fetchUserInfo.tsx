import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EFetchUserInfoStatusCode {
  UN_AUTH = 401,
  NOT_FOUND = 404
}

export interface FetchUserInfoResponse {
  created_at: string;
  email: string;
  id: string;
  nickname: string;
  paid_feature_id: string[]
  password_hash?: string;
  selected_project_id: string;
  updated_at: Date;
}

 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUserInfo = createAsyncThunk<FetchUserInfoResponse, void, any>(
  "userInfo/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
       
      const response = await axios.get<FetchUserInfoResponse>(`${import.meta.env.VITE_API_DOMAIN}/user/info`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EFetchUserInfoStatusCode.UN_AUTH, thunkAPI, error);
      redirectAndTokenDelete(EFetchUserInfoStatusCode.NOT_FOUND, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);