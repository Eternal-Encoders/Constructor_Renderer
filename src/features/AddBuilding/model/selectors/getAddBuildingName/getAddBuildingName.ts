import { createSelector } from "@reduxjs/toolkit";
import { AddBuildingSchema } from "../../types/addBuildingSchema";
import { getAddBuilding } from "../getAddBuilding/getAddBuilding";

export const getAddBuildingName = createSelector(getAddBuilding, (form?: AddBuildingSchema) => form?.name || ''); 