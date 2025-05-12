import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutRightGap = createSelector(getLayout, (layout) => layout.rightGap);