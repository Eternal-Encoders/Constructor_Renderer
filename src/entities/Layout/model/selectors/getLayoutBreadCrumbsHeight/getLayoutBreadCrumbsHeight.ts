import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutBreadCrumbsHeight = createSelector(getLayout, (layout) => layout.breadCrumbsHeight);