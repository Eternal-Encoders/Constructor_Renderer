import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getPatchedBuildingError = createSelector(getBuilding, (building) => building.patchError);