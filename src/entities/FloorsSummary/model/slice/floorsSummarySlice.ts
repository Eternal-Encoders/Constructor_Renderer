import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFloorsSummary } from "../../api/fetchFloorsSummary/fetchFloorsSummary";
import { FloorSummary, FloorSummarySchema } from "../types/floorsSummary";

const initialState: FloorSummarySchema = {
  isLoading: false,
}

const floorsSummarySlice = createSlice({
  name: 'floorsSummary',
  initialState,
  reducers: {
    initFloors: (state, action: PayloadAction<FloorSummary[]>) => {
      state.floors = action.payload;
    },
    addFloor: (state, action: PayloadAction<FloorSummary>) => {
      state.floors?.push(action.payload);
    },
    deleteFloor: (state, action: PayloadAction<string>) => {
      const index = state.floors!.map(floor => {
        return floor.id;
      }).indexOf(action.payload);

      state.floors?.splice(index, 1);
    },
    clearFloors: (state) => {
      state.floors?.splice(0, state.floors?.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFloorsSummary.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchFloorsSummary.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFloorsSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: floorsSummaryActions } = floorsSummarySlice;
export const { reducer: floorsSummaryReducer } = floorsSummarySlice;