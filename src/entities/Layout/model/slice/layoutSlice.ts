import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutSchema } from '../types/layoutSchema';

const initialState: LayoutSchema  = {
  navbarHeight: 84,
  topGapHeight: 12,
  bottomGapHeight: 12,
  leftPanelWidth: 240,
  rightPanelWidth: 240
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayoutNavbarHeight: (state, action: PayloadAction<number>) => {
      state.navbarHeight = action.payload;
    },
    setLayoutTopGapHeight: (state, action: PayloadAction<number>) => {
      state.topGapHeight = action.payload;
    },
    setLayoutBottomGapHeight: (state, action: PayloadAction<number>) => {
      state.bottomGapHeight = action.payload;
    },
    setLayoutLeftPanel: (state, action: PayloadAction<number>) => {
      state.leftPanelWidth = action.payload;
    },
    setLayoutRightPanel: (state, action: PayloadAction<number>) => {
      state.rightPanelWidth = action.payload;
    },
    clearLayout: (state) => {
      state.navbarHeight = 84;
      state.topGapHeight = 12;
      state.bottomGapHeight = 12;
      state.leftPanelWidth = 240;
      state.rightPanelWidth = 240;
    },
  },
});

export const {actions: layoutActions} = layoutSlice;
export const {reducer: layoutReducer} = layoutSlice;