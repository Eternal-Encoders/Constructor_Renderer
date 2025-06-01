import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorId = createSelector(getFloor, (floor) => floor.id);