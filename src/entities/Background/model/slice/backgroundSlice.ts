import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackgroundSchema } from '../types/backgroundSchema';

const initialState: BackgroundSchema  = {
  visibility: false,
  hexCode: '#F8F8FB',
  opacity: 1
}

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackgroundVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
    setBackgroundHEXCode: (state, action: PayloadAction<string>) => {
      state.hexCode = action.payload;
    },
    setBackgroundOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },
    clearBackground: (state) => {
      state.visibility= false;
      state.hexCode= '#F8F8FB';
      state.opacity= 1;
    },
  },
});

export const {actions: backgroundActions} = backgroundSlice;
export const {reducer: backgroundReducer} = backgroundSlice;
export const {hexCode: getInitialBackgroundHEXCode } = initialState;