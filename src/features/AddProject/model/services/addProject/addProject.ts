import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { projectActions, ProjectSchema } from "entities/Project";
import { projectsSummaryActions } from "entities/ProjectsSummary";

interface AddProjectProps {
  name: string;
  description?: string;
  url: string;
}

// enum ProjectErrors {
//   INCORRECT_DATA = '404',
//   SERVER_ERROR = '403'
// }

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
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Вы ввели неккоректное название для полей ввода');
    }
  },
);