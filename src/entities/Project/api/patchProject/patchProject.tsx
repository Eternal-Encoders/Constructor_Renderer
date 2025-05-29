import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EPatchProjectStatusCode {
  UN_AUTH = 401
}

interface PatchProjectProps {
  name?: string;
  description?: string;
  url?: string;
  id: string;
}

export const patchProject = createAsyncThunk<void, PatchProjectProps, { rejectValue: string }>(
  "projectInfo/patchProject",
  async (projectData, thunkAPI) => {
    try {

      await axios.patch(`${import.meta.env.VITE_API_DOMAIN}/project/${projectData.id}`, projectData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EPatchProjectStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при обновлении данных. Попробуйте позже.');
    }
  },
);