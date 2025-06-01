import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Decoration, GraphPoint, Room } from "shared/const/API";
import { deleteFloor } from "../../api/deleteFloor/deleteFloor";
import { fetchFloor } from "../../api/fetchFloor/fetchFloor";
import { patchFloor } from "../../api/patchFloor/patchFloor";
import { Floor, FloorSchema } from "../types/floor";

const initialState: FloorSchema = {
  id: '',
  index: 0,
  name: '',
  building_id: '',
  decorations: [],
  rooms: [],
  graph_points: [],
  created_at: new Date(),
  updated_at: new Date(),
  isLoading: false,
  patchIsLoading: false,
  deleteIsLoading: false,
}

const floorSlice = createSlice({
  name: 'floor',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => { 
      state.id = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => { 
      state.index = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => { 
      state.name = action.payload;
    },
    setBuildingId: (state, action: PayloadAction<string>) => { 
      state.building_id = action.payload;
    },
    setDecorations: (state, action: PayloadAction<Decoration>) => { 
      state.decorations.push(action.payload);
    },
    setRooms: (state, action: PayloadAction<Room>) => { 
      state.decorations.push(action.payload);
    },
    setGraphPoints: (state, action: PayloadAction<GraphPoint>) => { 
      state.graph_points.push(action.payload);
    },
    setCreatedAt: (state, action: PayloadAction<Date>) => { 
      state.created_at = action.payload;
    },
    setUpdatedAt: (state, action: PayloadAction<Date>) => { 
      state.updated_at = action.payload;
    },
    initFloor: (state, action: PayloadAction<Floor>) => { 
      state.id = action.payload.id;
      state.index = action.payload.index;
      state.name = action.payload.name;
      state.building_id = action.payload.building_id;
      state.decorations = action.payload.decorations;
      state.rooms = action.payload.rooms;
      state.graph_points = action.payload.graph_points;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
    },
    clearFloor: (state) => { 
      state.id = '';
      state.index = 0;
      state.name = '';
      state.building_id = '';
      state.decorations = [];
      state.rooms = [];
      state.graph_points = [];
      state.created_at = new Date();
      state.updated_at = new Date();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFloor.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchFloor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(patchFloor.pending, (state) => {
      state.patchError = undefined;
      state.patchIsLoading = true;
    })
      .addCase(patchFloor.fulfilled, (state) => {
        state.patchIsLoading = false;
      })
      .addCase(patchFloor.rejected, (state, action) => {
        state.patchIsLoading = false;
        state.patchError = action.payload;
      });
    builder.addCase(deleteFloor.pending, (state) => {
      state.deleteError = undefined;
      state.deleteIsLoading = true;
    })
      .addCase(deleteFloor.fulfilled, (state) => {
        state.deleteIsLoading = false;
      })
      .addCase(deleteFloor.rejected, (state, action) => {
        state.deleteIsLoading = false;
        state.deleteError = action.payload;
      });
  },
})

export const { actions: floorActions } = floorSlice;
export const { reducer: floorReducer } = floorSlice;