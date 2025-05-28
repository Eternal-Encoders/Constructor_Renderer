import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { redirectAndTokenDelete } from "helpers/redirectAndTokenDelete";
import { Decoration, GraphPoint, Room } from "shared/const/API";

enum EPatchFloorStatusCode {
  UN_AUTH = 401
}

interface PatchFloorProps {
  floor: {
    index?: number;
    name?: string;
    building_id?: string;
    width?: number;
    height?: number;
    decorations?: Decoration[];
    rooms?: Room[];
    graph_points?: GraphPoint[];
  },
  floorId: string;
}

export const patchFloor = createAsyncThunk<void, PatchFloorProps, { rejectValue: string }>(
  "floorInfo/patchFloor",
  async (floorData, thunkAPI) => {
    try {

      await axios.patch(`${import.meta.env.VITE_API_DOMAIN}/floor/${floorData.floorId}`,
        floorData.floor);

              

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: AxiosError | any) {
      const error = err as AxiosError;

      redirectAndTokenDelete(EPatchFloorStatusCode.UN_AUTH, thunkAPI, error);
      
      return thunkAPI.rejectWithValue('Ошибка при обновлении данных. Попробуйте позже.');
    }
  },
);