import { createSelector } from "@reduxjs/toolkit";
import { AddBuildingSchema } from "../../types/addBuildingSchema";
import { getAddBuilding } from "../getAddBuilding/getAddBuilding";

export const getAddBuildingLatitude = createSelector(getAddBuilding, 
  (form?: AddBuildingSchema) => form?.latitude || 0); 