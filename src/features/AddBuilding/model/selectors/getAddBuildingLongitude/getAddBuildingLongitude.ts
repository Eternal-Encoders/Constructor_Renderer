import { createSelector } from "@reduxjs/toolkit";
import { AddBuildingSchema } from "../../types/addBuildingSchema";
import { getAddBuilding } from "../getAddBuilding/getAddBuilding";

export const getAddBuildingLongitude = createSelector(getAddBuilding, 
  (form?: AddBuildingSchema) => form?.longitude || 0); 