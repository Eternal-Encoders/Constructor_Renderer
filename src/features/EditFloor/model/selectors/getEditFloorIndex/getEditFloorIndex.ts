import { createSelector } from "@reduxjs/toolkit";
import { EditFloorSchema } from "../../types/editFloorSchema";
import { getEditFloor } from "../getEditFloor/getEditFloor";

export const getEditFloorIndex = createSelector(getEditFloor, (form?: EditFloorSchema) => form?.index || 0); 