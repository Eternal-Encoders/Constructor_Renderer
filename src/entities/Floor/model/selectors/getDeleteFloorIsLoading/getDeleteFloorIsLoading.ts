import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getDeleteFloorIsLoading = createSelector(getFloor, (floor) => floor.patchIsLoading);