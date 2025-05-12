import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingDisplayableName = createSelector(getBuilding, (building) => building.displayable_name);