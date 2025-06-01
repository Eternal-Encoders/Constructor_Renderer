import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patchFloor } from 'entities/Floor';
import { EditFloorSchema } from '../types/editFloorSchema';

const initialState: EditFloorSchema = {
  index: 0,
  name: '',
  isLoading: false,
}

const editFloorSlice = createSlice({
  name: 'editFloor',
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(patchFloor.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(patchFloor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(patchFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: editFloorActions } = editFloorSlice;
export const { reducer: editFloorReducer } = editFloorSlice;