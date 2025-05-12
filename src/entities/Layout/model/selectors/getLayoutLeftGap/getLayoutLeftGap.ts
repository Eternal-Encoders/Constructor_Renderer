import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutLeftGap = createSelector(getLayout, (layout) => layout.leftGap);