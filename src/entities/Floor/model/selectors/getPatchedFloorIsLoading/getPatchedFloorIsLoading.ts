import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getPatchedFloorIsLoading = createSelector(getFloor, (floor) => floor.patchIsLoading);