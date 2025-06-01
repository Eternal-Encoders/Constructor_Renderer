import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getPatchedFloorError = createSelector(getFloor, (floor) => floor.patchError);