import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buildingActions, BuildingSchema } from "entities/Building";
import { buildingsSummaryActions } from "entities/BuildingsSummary";
import { GPS } from "shared/const/API";

interface AddBuildingProps {
  project_id: string;
  name: string;
  displayable_name: string;
  description?: string;
  url: string;
  latitude: number;
  longitude: number;
  gps?: GPS;
}

// enum BuildingErrors {
//   INCORRECT_DATA = '404',
//   SERVER_ERROR = '403'
// }

export const addBuilding = createAsyncThunk<BuildingSchema, AddBuildingProps, { rejectValue: string }>(
  "building/addBuilding",
  async (buildingData, thunkAPI) => {
    try {
       
      const response = await axios.post<BuildingSchema>(`${import.meta.env.VITE_API_DOMAIN}/building`, buildingData);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(buildingActions.initBuilding(response.data));
      thunkAPI.dispatch(buildingsSummaryActions.addBuilding(response.data));

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Вы ввели неккоректное название для полей ввода');
    }
  },
);