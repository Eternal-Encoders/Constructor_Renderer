import { createSelector } from "@reduxjs/toolkit";
import { AddBuildingSchema } from "../../types/addBuildingSchema";
import { getAddBuilding } from "../getAddBuilding/getAddBuilding";

// eslint-disable-next-line @stylistic/js/max-len
export const getAddBuildingIsLoading = createSelector(getAddBuilding, (form?: AddBuildingSchema) => form?.isLoading || false); 