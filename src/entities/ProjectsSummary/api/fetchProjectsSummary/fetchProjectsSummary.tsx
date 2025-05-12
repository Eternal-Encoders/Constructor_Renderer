import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { projectsSummaryActions } from "../../model/slice/projectsSummarySlice";
import { ProjectSummary } from "../../model/types/projectsSummary";

// enum RegisterErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

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
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);