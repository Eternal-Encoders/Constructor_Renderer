import { createSelector } from "@reduxjs/toolkit";
import { AddFloorSchema } from "../../types/addFloorSchema";
import { getAddFloor } from "../getAddFloor/getAddFloor";

export const getAddFloorIndex = createSelector(getAddFloor, (form?: AddFloorSchema) => form?.index || NaN); 