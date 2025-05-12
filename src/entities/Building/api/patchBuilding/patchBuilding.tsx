import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GPS } from "shared/const/API";

// enum PatchBuildingErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

interface PatchBuildingProps {
  building: {
    project_id?: string;
    name?: string;
    displayable_name?: string;
    description?: string;
    url?: string;
    latitude?: number;
    longitude?: number;
    gps?: GPS;
  }
  buildingId: string
}

export const patchBuilding = createAsyncThunk<void, PatchBuildingProps, { rejectValue: string }>(
  "buildingInfo/patchBuilding",
  async (buildingData, thunkAPI) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_DOMAIN}/building/${buildingData.buildingId}`,
        buildingData.building);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Ошибка при получении данных. Попробуйте позже.');
    }
  },
);