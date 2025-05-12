import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getPatchedBuildingIsLoading = createSelector(getBuilding, (building) => building.patchIsLoading);