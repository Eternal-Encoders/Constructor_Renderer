import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addFloor } from '../services/addFloor/addFloor';
import { AddFloorSchema } from '../types/addFloorSchema';

const initialState: AddFloorSchema = {
  index: 0,
  name: '',
  isLoading: false,
}

const addFloorSlice = createSlice({
  name: 'addFloor',
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
    builder.addCase(addFloor.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(addFloor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: addFloorActions } = addFloorSlice;
export const { reducer: addFloorReducer } = addFloorSlice;