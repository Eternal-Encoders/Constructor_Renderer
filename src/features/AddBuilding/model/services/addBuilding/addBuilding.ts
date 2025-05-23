import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { buildingActions, BuildingSchema } from "entities/Building";
import { buildingsSummaryActions } from "entities/BuildingsSummary";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
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

enum EAddBuildingStatusCode {
  UN_AUTH = 401
}

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EAddBuildingStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при добавлении здания. Попробуйте позже.');
    }
  },
);