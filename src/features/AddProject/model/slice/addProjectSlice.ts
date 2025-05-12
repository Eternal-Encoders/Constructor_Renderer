import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addProject } from '../services/addProject/addProject';
import { AddProjectSchema } from '../types/addProjectSchema';

const initialState: AddProjectSchema = {
  name: '',
  url: '',
  isLoading: false,
}

const addProjectSlice = createSlice({
  name: 'addProject',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProject.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(addProject.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: addProjectActions } = addProjectSlice;
export const { reducer: addProjectReducer } = addProjectSlice;