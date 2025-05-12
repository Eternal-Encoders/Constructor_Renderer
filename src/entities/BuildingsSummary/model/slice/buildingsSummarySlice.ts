import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBuildingsSummary } from "../../api/fetchBuildingsSummary/fetchBuildingsSummary";
import { BuildingSummary, BuildingSummarySchema } from "../types/buildingsSummary";

const initialState: BuildingSummarySchema = {
  isLoading: false,
}

const buildingsSummarySlice = createSlice({
  name: 'buildingsSummary',
  initialState,
  reducers: {
    initBuildings: (state, action: PayloadAction<BuildingSummary[]>) => {
      state.buildings = action.payload;
    },
    addBuilding: (state, action: PayloadAction<BuildingSummary>) => {
      state.buildings?.push(action.payload);
    },
    deleteBuilding: (state, action: PayloadAction<string>) => {
      const index = state.buildings!.map(building => {
        return building.id;
      }).indexOf(action.payload);

      state.buildings?.splice(index, 1);
    },
    clearBuildings: (state) => {
      state.buildings?.splice(0, state.buildings?.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuildingsSummary.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchBuildingsSummary.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBuildingsSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: buildingsSummaryActions } = buildingsSummarySlice;
export const { reducer: buildingsSummaryReducer } = buildingsSummarySlice;