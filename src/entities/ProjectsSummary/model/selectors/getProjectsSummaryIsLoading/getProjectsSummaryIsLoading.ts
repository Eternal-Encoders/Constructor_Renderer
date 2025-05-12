import { createSelector } from "@reduxjs/toolkit";
import { getProjectsSummary } from "../getProjectsSummary/getProjectsSummary";

export const getProjectsSummaryIsLoading = createSelector(getProjectsSummary, (state) => state?.isLoading);