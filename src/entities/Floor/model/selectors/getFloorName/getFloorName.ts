import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorName = createSelector(getFloor, (floor) => floor.name);