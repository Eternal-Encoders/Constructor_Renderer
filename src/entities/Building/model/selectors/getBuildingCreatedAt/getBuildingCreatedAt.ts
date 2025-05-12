import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingCreatedAt = createSelector(getBuilding, (building) => building.created_at);