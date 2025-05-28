import { createSelector } from "@reduxjs/toolkit";
import { EditFloorSchema } from "../../types/editFloorSchema";
import { getEditFloor } from "../getEditFloor/getEditFloor";

export const getEditFloorError = createSelector(getEditFloor, (form?: EditFloorSchema) => form?.error || ''); 