import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutRightPanelWidth = createSelector(getLayout, (layout) => layout.rightPanelWidth);