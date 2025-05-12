import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buildingsSummaryActions } from "entities/BuildingsSummary";

// enum deleteBuildingErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const deleteBuilding = createAsyncThunk<void, string, { rejectValue: string }>(
  "buildingInfo/deleteBuilding",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/building/${id}`);

      if (response.status.toString() !== '200') {
        throw new Error();
      }

      thunkAPI.dispatch(buildingsSummaryActions.deleteBuilding(id));
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при удалении данных. Попробуйте позже.');
    }
  },
);