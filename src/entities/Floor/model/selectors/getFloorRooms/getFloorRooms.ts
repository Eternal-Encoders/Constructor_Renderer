import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getFloorRooms = createSelector(getFloor, (floor) => floor.rooms);