import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FloorSchema } from '../types/floorSchema';

const initialState: FloorSchema[] = [];

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {
    setFloorsRectangle: (state, action: PayloadAction<FloorSchema>) => {
      state.push(action.payload);
    },
    clearFloors: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const {actions: floorsActions} = floorsSlice;
export const {reducer: floorsReducer} = floorsSlice;