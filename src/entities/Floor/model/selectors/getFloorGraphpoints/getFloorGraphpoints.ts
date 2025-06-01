import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorGraphpoints = createSelector(getFloor, (floor) => floor.graph_points);