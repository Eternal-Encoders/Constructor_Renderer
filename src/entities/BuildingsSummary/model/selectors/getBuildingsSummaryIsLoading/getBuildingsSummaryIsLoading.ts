import { createSelector } from "@reduxjs/toolkit";
import { getBuildingsSummary } from "../getBuildingsSummary/getBuildingsSummary";

export const getBuildingsSummaryIsLoading = createSelector(getBuildingsSummary, (state) => state?.isLoading);