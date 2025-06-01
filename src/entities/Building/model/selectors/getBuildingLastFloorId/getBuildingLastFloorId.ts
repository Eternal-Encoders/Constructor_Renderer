import { createSelector } from "@reduxjs/toolkit";
import { getBuilding } from "../getBuilding/getBuilding";

export const getBuildingLastFloorId = createSelector(getBuilding, (building) => building.last_floor_id);