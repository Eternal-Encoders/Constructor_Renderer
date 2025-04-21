import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutLeftPanelWidth = createSelector(getLayout, (layout) => layout.leftPanelWidth);