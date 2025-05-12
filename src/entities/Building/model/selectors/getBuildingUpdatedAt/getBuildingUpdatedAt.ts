import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingUpdatedAt = createSelector(getBuilding, (building) => building.updated_at);