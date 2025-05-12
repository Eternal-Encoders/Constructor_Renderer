import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutHeaderHeight = createSelector(getLayout, (layout) => layout.headerHeight);