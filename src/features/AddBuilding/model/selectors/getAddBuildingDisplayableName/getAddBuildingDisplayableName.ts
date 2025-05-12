import { createSelector } from "@reduxjs/toolkit";
import { AddBuildingSchema } from "../../types/addBuildingSchema";
import { getAddBuilding } from "../getAddBuilding/getAddBuilding";

export const getAddBuildingDisplayableName = createSelector(getAddBuilding, 
  (form?: AddBuildingSchema) => form?.displayable_name || ''); 