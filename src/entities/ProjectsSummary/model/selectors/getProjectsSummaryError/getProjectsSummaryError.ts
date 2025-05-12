import { createSelector } from "@reduxjs/toolkit";
import { getProjectsSummary } from "../getProjectsSummary/getProjectsSummary";

export const getProjectsSummaryError = createSelector(getProjectsSummary, (state) => state?.error);