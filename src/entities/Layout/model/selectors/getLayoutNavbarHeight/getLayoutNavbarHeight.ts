import { createSelector } from "@reduxjs/toolkit";
import { getLayout } from "../getLayout/getBackground";

export const getLayoutNavbarHeight = createSelector(getLayout, (layout) => layout.navbarHeight);