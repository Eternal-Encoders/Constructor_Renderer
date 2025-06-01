import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorUpdatedAt = createSelector(getFloor, (floor) => floor.updated_at);