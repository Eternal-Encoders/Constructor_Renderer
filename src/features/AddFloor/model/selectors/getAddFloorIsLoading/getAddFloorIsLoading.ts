import { createSelector } from "@reduxjs/toolkit";
import { AddFloorSchema } from "../../types/addFloorSchema";
import { getAddFloor } from "../getAddFloor/getAddFloor";

export const getAddFloorIsLoading = createSelector(getAddFloor, (form?: AddFloorSchema) => form?.isLoading || false); 