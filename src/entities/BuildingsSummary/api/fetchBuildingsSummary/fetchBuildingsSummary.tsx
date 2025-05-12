import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buildingsSummaryActions } from "../../model/slice/buildingsSummarySlice";
import { BuildingSummary } from "../../model/types/buildingsSummary";

// enum RegisterErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const fetchBuildingsSummary = createAsyncThunk<BuildingSummary[], string, { rejectValue: string }>(
  "buildingSummary/fetchBuildingSummary",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<BuildingSummary[]>(`${import.meta.env.VITE_API_DOMAIN}/project/${id}/buildings`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(buildingsSummaryActions.initBuildings(response.data));

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);