import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBuilding } from '../services/addBuilding/addBuilding';
import { AddBuildingSchema } from '../types/addBuildingSchema';

const initialState: AddBuildingSchema = {
  project_id: '',
  name: '',
  displayable_name: '',
  description: '',
  url: '',
  latitude: 0,
  longitude: 0,
  isLoading: false,
}

const addBuildingSlice = createSlice({
  name: 'addBuilding',
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.project_id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDisplayableName: (state, action: PayloadAction<string>) => {
      state.displayable_name = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number>) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number>) => {
      state.longitude = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBuilding.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(addBuilding.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addBuilding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: addBuildingActions } = addBuildingSlice;
export const { reducer: addBuildingReducer } = addBuildingSlice;