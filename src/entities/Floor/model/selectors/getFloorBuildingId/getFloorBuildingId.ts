import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorBuildingId = createSelector(getFloor, (floor) => floor.building_id);