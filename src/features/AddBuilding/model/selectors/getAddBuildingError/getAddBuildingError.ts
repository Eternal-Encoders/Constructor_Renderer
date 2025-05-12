import { createSelector } from "@reduxjs/toolkit";
import { AddBuildingSchema } from "../../types/addBuildingSchema";
import { getAddBuilding } from "../getAddBuilding/getAddBuilding";

export const getAddBuildingError = createSelector(getAddBuilding, (form?: AddBuildingSchema) => form?.error || ''); 