import { createSelector } from "@reduxjs/toolkit";
import { NavigationSchema } from "../../types/navigationSchema";
import { getNavigation } from "../getNavigation/getNavigation";

export const getNavigationSubCategory = createSelector(
  getNavigation,
  (navigation: NavigationSchema) => navigation.selectedSubCategory
);