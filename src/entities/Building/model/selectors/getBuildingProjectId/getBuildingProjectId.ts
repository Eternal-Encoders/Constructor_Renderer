import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingProjectId = createSelector(getBuilding, (building) => building.project);