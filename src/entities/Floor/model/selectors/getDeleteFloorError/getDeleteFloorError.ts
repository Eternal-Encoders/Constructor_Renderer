import { createSelector } from "@reduxjs/toolkit";
import { getFloor } from "../getFloor/getFloor";

export const getDeleteFloorError = createSelector(getFloor, (floor) => floor.deleteError);