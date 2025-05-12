import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getDeleteBuildingError = createSelector(getBuilding, (building) => building.deleteError);