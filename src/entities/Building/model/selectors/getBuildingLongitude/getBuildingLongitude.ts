import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingLongitude = createSelector(getBuilding, (building) => building.longitude);