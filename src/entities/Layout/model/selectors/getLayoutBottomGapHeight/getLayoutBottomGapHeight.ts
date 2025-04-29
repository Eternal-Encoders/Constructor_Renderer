import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutBottomGapHeight = createSelector(getLayout, (layout) => layout.bottomGapHeight);