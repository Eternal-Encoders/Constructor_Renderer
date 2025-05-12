import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingName = createSelector(getBuilding, (building) => building.name);