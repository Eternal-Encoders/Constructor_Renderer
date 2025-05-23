import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { buildingsSummaryActions } from "entities/BuildingsSummary";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";

enum EDeleteBuildingStatusCode {
  SUCCESS = 200,
  UN_AUTH = 401
}

export const deleteBuilding = createAsyncThunk<void, string, { rejectValue: string }>(
  "buildingInfo/deleteBuilding",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/building/${id}`);

      if (response.status !== EDeleteBuildingStatusCode.SUCCESS) {
        throw new Error();
      }

      thunkAPI.dispatch(buildingsSummaryActions.deleteBuilding(id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EDeleteBuildingStatusCode.UN_AUTH, thunkAPI, error);

      return thunkAPI.rejectWithValue('Ошибка при удалении данных. Попробуйте позже.');
    }
  },
);