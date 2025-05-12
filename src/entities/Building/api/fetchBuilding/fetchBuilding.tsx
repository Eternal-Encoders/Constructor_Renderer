import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buildingActions } from "entities/Building/model/slice/buildingSlice";
import { Building } from "entities/Building/model/types/building";

// enum FetchBuildingErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const fetchBuilding = createAsyncThunk<Building, string, { rejectValue: string }>(
  "buildingInfo/fetchBuilding",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<Building>(`${import.meta.env.VITE_API_DOMAIN}/building/${id}`);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(buildingActions.initBuilding(response.data));

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);