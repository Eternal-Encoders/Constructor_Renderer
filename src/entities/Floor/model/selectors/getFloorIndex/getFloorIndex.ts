import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorIndex = createSelector(getFloor, (floor) => floor.index);