import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutTopGap = createSelector(getLayout, (layout) => layout.topGap);