import { createSelector } from "@reduxjs/toolkit";
import { NavigationSchema } from "../../types/navigationSchema";
import { getNavigation } from "../getNavigation/getNavigation";

export const getNavigationCategory = createSelector(
  getNavigation,
  (navigation: NavigationSchema) => navigation.selectedCategory
);