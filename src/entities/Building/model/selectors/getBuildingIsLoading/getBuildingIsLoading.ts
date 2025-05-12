import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingIsLoading = createSelector(getBuilding, (building) => building.isLoading);