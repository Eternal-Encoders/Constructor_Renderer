import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// enum FetchErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

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

 
export const fetchUserInfo = createAsyncThunk<FetchUserInfoResponse, void, { rejectValue: string }>(
  "userInfo/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
       
      const response = await axios.get<FetchUserInfoResponse>(`${import.meta.env.VITE_API_DOMAIN}/user/info`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);