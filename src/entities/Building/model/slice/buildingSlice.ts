import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteBuilding } from "../../api/deleteBuilding/deleteBuilding";
import { fetchBuilding } from "../../api/fetchBuilding/fetchBuilding";
import { patchBuilding } from "../../api/patchBuilding/patchBuilding";
import { Building, BuildingSchema } from "../types/building";

const initialState: BuildingSchema = {
  id: '',
  name: '',
  displayable_name: '',
  status: false,
  project: '',
  url: '',
  description: '',
  latitude: 0,
  longitude: 0,
  last_floor_id: '',
  created_at: new Date(),
  updated_at: new Date(),
  isLoading: false,
  patchIsLoading: false,
  deleteIsLoading: false,
}

const buildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => { 
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => { 
      state.name = action.payload;
    },
    setDisplayableName: (state, action: PayloadAction<string>) => { 
      state.displayable_name = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => { 
      state.status = action.payload;
    },
    setProjectId: (state, action: PayloadAction<string>) => { 
      state.project = action.payload;
    },
    setURL: (state, action: PayloadAction<string>) => { 
      state.url = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => { 
      state.description = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number>) => { 
      state.latitude = action.payload;
    },
    setLongitute: (state, action: PayloadAction<number>) => { 
      state.longitude = action.payload;
    },
    setLastFloorId: (state, action: PayloadAction<string>) => { 
      state.last_floor_id = action.payload;
    },
    setCreatedAt: (state, action: PayloadAction<Date>) => { 
      state.created_at = action.payload;
    },
    setUpdatedAt: (state, action: PayloadAction<Date>) => { 
      state.updated_at = action.payload;
    },
    initBuilding: (state, action: PayloadAction<Building>) => { 
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.displayable_name = action.payload.displayable_name;
      state.project = action.payload.project;
      state.url = action.payload.url;
      state.description = action.payload.description;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.last_floor_id = action.payload.last_floor_id;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
    },
    clearBuilding: (state) => { 
      state.id = '';
      state.name = '';
      state.displayable_name = '';
      state.project = '';
      state.url = '';
      state.description = '';
      state.latitude = 0;
      state.longitude = 0;
      state.last_floor_id = '';
      state.created_at = new Date();
      state.updated_at = new Date();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuilding.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchBuilding.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBuilding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(patchBuilding.pending, (state) => {
      state.patchError = undefined;
      state.patchIsLoading = true;
    })
      .addCase(patchBuilding.fulfilled, (state) => {
        state.patchIsLoading = false;
      })
      .addCase(patchBuilding.rejected, (state, action) => {
        state.patchIsLoading = false;
        state.patchError = action.payload;
      });
    builder.addCase(deleteBuilding.pending, (state) => {
      state.deleteError = undefined;
      state.deleteIsLoading = true;
    })
      .addCase(deleteBuilding.fulfilled, (state) => {
        state.deleteIsLoading = false;
      })
      .addCase(deleteBuilding.rejected, (state, action) => {
        state.deleteIsLoading = false;
        state.deleteError = action.payload;
      });
  },
})

export const { actions: buildingActions } = buildingSlice;
export const { reducer: buildingReducer } = buildingSlice;