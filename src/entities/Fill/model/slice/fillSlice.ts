import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FillSchema } from '../types/fillSchema';

const initialState: FillSchema  = {
  hexCode: '#F8F8FB',
  visibility: false,
  opacity: 1
}

const fillSlice = createSlice({
  name: 'fill',
  initialState,
  reducers: {
    setFillVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
    setFillHEXCode: (state, action: PayloadAction<string>) => {
      state.hexCode = action.payload;
    },
    setFillOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },
    clearFill: (state) => {
      state.visibility= false;
      state.hexCode= '#F8F8FB';
      state.opacity= 1;
    },
  },
});

export const {actions: fillActions} = fillSlice;
export const {reducer: fillReducer} = fillSlice;
export const { hexCode: fillHEXCode } = initialState;