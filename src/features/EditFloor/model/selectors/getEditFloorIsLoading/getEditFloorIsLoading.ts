import { createSelector } from "@reduxjs/toolkit";
import { EditFloorSchema } from "../../types/editFloorSchema";
import { getEditFloor } from "../getEditFloor/getEditFloor";

export const getEditFloorIsLoading = createSelector(getEditFloor, 
  (form?: EditFloorSchema) => form?.isLoading || false); 