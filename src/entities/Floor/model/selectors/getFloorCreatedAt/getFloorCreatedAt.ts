import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorCreatedAt = createSelector(getFloor, (floor) => floor.created_at);