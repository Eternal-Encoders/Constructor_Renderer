import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { projectsSummaryActions } from "entities/ProjectsSummary";

// enum DeleteProjectErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const deleteProject = createAsyncThunk<void, string, { rejectValue: string }>(
  "projectInfo/deleteProject",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/project/${id}`);

      if (response.status.toString() !== '200') {
        throw new Error();
      }

      thunkAPI.dispatch(projectsSummaryActions.deleteProject(id));
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при удалении данных. Попробуйте позже.');
    }
  },
);