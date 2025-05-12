import { createSelector } from "@reduxjs/toolkit";
import { getBuildingsSummary } from "../getBuildingsSummary/getBuildingsSummary";

export const getBuildingsSummaryError = createSelector(getBuildingsSummary, (state) => state?.error);