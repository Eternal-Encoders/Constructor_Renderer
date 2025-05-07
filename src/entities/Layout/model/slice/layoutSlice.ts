import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutSchema } from '../types/layoutSchema';

const initialState: LayoutSchema  = {
  leftGap: 30,
  rightGap: 30,
  topGap: 12,
  bottomGap: 12,
  navbarHeight: 84,
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
      state.topGap = action.payload;
    },
    setLayoutBottomGapHeight: (state, action: PayloadAction<number>) => {
      state.bottomGap = action.payload;
    },
    setLayoutLeftPanel: (state, action: PayloadAction<number>) => {
      state.leftPanelWidth = action.payload;
    },
    setLayoutRightPanel: (state, action: PayloadAction<number>) => {
      state.rightPanelWidth = action.payload;
    },
    setLayoutLeftGap: (state, action: PayloadAction<number>) => {
      state.rightPanelWidth = action.payload;
    },
    setLayoutRightRight: (state, action: PayloadAction<number>) => {
      state.rightPanelWidth = action.payload;
    },
    setFullScreen: (state) => {
      state.topGap = 0;
      state.bottomGap = 0;
      state.leftGap = 0;
      state.rightGap = 0;
      state.navbarHeight = 0;
      state.leftPanelWidth = 0;
      state.rightPanelWidth = 0;
    },
    clearLayout: (state) => {
      state.topGap = 12;
      state.bottomGap = 12;
      state.leftGap = 30;
      state.rightGap = 30;
      state.navbarHeight = 84;
      state.leftPanelWidth = 240;
      state.rightPanelWidth = 240;
    },
  },
});

export const {actions: layoutActions} = layoutSlice;
export const {reducer: layoutReducer} = layoutSlice;