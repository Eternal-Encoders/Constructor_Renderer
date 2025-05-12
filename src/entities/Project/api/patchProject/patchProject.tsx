import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// enum RegisterErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

interface PatchProjectProps {
  name?: string;
  url?: string;
  id: string;
}

export const patchProject = createAsyncThunk<void, PatchProjectProps, { rejectValue: string }>(
  "projectInfo/patchProject",
  async (projectData, thunkAPI) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_DOMAIN}/project/${projectData.id}`, projectData);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);