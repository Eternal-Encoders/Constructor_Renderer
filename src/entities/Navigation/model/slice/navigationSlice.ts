import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ENavigationCategory, ENavigationSubCategory, NavigationSchema } from '../types/navigationSchema';

const initialState: NavigationSchema = {
  selectedCategory: ENavigationCategory.None,
  selectedSubCategory: ENavigationSubCategory.None
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ENavigationCategory>) => {
      state.selectedCategory = action.payload;
    },
    setSubCategory: (state, action: PayloadAction<ENavigationSubCategory>) => {
      state.selectedSubCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = ENavigationCategory.None;
    },
    clearSubCategory: (state) => {
      state.selectedSubCategory = ENavigationSubCategory.None;
    },
  }
})

export const { actions: navigationActions } = navigationSlice;
export const { reducer: navigationReducer } = navigationSlice;