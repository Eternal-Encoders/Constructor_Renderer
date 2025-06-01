import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { projectsSummaryActions } from "entities/ProjectsSummary";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EDeleteProjectStatusCode {
  SUCCESS = 200,
  UN_AUTH = 401
}

export const deleteProject = createAsyncThunk<void, string, { rejectValue: string }>(
  "projectInfo/deleteProject",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/project/${id}`);

      if (response.status !== EDeleteProjectStatusCode.SUCCESS) {
        throw new Error();
      }

      thunkAPI.dispatch(projectsSummaryActions.deleteProject(id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EDeleteProjectStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при удалении проекта. Попробуйте позже.');
    }
  },
);