import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorError = createSelector(getFloor, (floor) => floor?.error);