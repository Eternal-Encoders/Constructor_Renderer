import { createSelector } from "@reduxjs/toolkit";
import { EditFloorSchema } from "../../types/editFloorSchema";
import { getEditFloor } from "../getEditFloor/getEditFloor";

export const getEditFloorName = createSelector(getEditFloor, (form?: EditFloorSchema) => form?.name || ''); 