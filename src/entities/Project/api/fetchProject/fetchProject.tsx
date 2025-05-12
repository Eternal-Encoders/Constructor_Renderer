import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { projectActions } from "../../model/slice/projectSlice";
import { Project } from "../../model/types/project";

// enum FetchErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

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
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);