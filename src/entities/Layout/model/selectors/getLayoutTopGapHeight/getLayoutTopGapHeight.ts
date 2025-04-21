import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutTopGapHeight = createSelector(getLayout, (layout) => layout.topGapHeight);