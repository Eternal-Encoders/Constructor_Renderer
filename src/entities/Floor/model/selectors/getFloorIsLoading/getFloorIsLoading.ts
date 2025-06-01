import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorIsLoading = createSelector(getFloor, (floor) => floor.isLoading);