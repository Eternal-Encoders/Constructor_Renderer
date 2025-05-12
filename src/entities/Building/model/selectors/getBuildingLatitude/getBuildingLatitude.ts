import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingLatitude = createSelector(getBuilding, (building) => building.latitude);