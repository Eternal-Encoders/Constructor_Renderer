import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Polygon, Rectangle } from 'entities/Figure/Figure';
import { LayersSchema } from '../types/layersSchema';

const initialState: LayersSchema  = {
  figures: [],
}

const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    setLayersRectangle: (state, action: PayloadAction<Rectangle>) => {
      state.figures.push(action.payload);
    },
    setLayersPolygon: (state, action: PayloadAction<Polygon>) => {
      state.figures.push(action.payload);
    },
    clearLayers: (state) => {
      state.figures = [];
    },
  },
});

export const {actions: layersActions} = layersSlice;
export const {reducer: layersReducer} = layersSlice;