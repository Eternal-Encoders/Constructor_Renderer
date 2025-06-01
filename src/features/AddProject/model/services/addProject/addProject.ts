import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { projectActions, ProjectSchema } from "entities/Project";
import { projectsSummaryActions } from "entities/ProjectsSummary";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

interface AddProjectProps {
  name: string;
  description?: string;
  url: string;
}

enum EAddProjectStatusCode {
  UN_AUTH = 401
}

export const addProject = createAsyncThunk<ProjectSchema, AddProjectProps, { rejectValue: string }>(
  "project/addProject",
  async (projectData, thunkAPI) => {
    try {
       
      const response = await axios.post<ProjectSchema>(`${import.meta.env.VITE_API_DOMAIN}/project`, projectData);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(projectActions.initProject(response.data));
      thunkAPI.dispatch(projectsSummaryActions.addProject(response.data));

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EAddProjectStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при добавлении проекта. Попробуйте позже.');
    }
  },
);