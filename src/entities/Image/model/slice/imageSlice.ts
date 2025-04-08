import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSchema } from '../types/imageSchema';

const initialState: ImageSchema  = {
  src: null,
}

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload;
    },
    clearImage: (state) => {
      state.src = null;
    },
  },
});

export const {actions: imageActions} = imageSlice;
export const {reducer: imageReducer} = imageSlice;