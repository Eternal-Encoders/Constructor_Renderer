import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { projectActions } from "../../model/slice/projectSlice";
import { Project } from "../../model/types/project";

enum EFetchProjectStatusCode {
  UN_AUTH = 401
}

export const fetchProject = createAsyncThunk<Project, string, { rejectValue: string }>(
  "projectInfo/fetchProject",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<Project>(`${import.meta.env.VITE_API_DOMAIN}/project/${id}`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(projectActions.initProject(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EFetchProjectStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);