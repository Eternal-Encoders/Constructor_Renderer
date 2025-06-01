import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { projectsSummaryActions } from "../../model/slice/projectsSummarySlice";
import { ProjectSummary } from "../../model/types/projectsSummary";

enum EFetchProjectsSummaryStatusCode {
  UN_AUTH = 401
}

export const fetchProjectsSummary = createAsyncThunk<ProjectSummary[], void, { rejectValue: string }>(
  "projectSummary/fetchProjectSummary",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ProjectSummary[]>(`${import.meta.env.VITE_API_DOMAIN}/user/projects`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(projectsSummaryActions.initProjects(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EFetchProjectsSummaryStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);