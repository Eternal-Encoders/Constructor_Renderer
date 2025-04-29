import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSchema } from '../types/imageSchema';

const initialState: ImageSchema  = {
  src: null,
  visibility: false,
  name: '',
  opacity: 1
}

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageSrc: (state, action: PayloadAction<string | null>) => {
      state.src = action.payload;
    },
    setImageVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
    setImageName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setImageOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },
    clearImage: (state) => {
      state.src = null;
      state.visibility= false;
      state.name= '';
      state.opacity= 1;
    },
  },
});

export const {actions: imageActions} = imageSlice;
export const {reducer: imageReducer} = imageSlice;