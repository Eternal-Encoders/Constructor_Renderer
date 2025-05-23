import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { GPS } from "shared/const/API";

enum EPatchBuildingStatusCode {
  UN_AUTH = 401
}

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EPatchBuildingStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при обновлении данных. Попробуйте позже.');
    }
  },
);