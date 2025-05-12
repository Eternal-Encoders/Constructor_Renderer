import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ENavigationCategory, NavigationSchema } from '../types/navigationSchema';

const initialState: NavigationSchema = {
  selectedCategory: ENavigationCategory.ProjectSelection,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ENavigationCategory>) => {
      state.selectedCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = ENavigationCategory.None;
    },
  }
})

export const { actions: navigationActions } = navigationSlice;
export const { reducer: navigationReducer } = navigationSlice;