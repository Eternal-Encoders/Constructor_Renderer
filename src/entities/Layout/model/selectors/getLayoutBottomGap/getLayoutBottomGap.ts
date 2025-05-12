import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutBottomGap = createSelector(getLayout, (layout) => layout.bottomGap);