import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getDeleteBuildingIsLoading = createSelector(getBuilding, (building) => building.patchIsLoading);