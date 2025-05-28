import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorDecorations = createSelector(getFloor, (floor) => floor.decorations);