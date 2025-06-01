import { createSelector } from "@reduxjs/toolkit";
import { getFloorsSummary } from "../getFloorsSummary/getFloorsSummary";

export const getFloorsSummaryIsLoading = createSelector(getFloorsSummary, (state) => state?.isLoading);