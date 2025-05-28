import { createSelector } from "@reduxjs/toolkit";
import { getFloorsSummary } from "../getFloorsSummary/getFloorsSummary";

export const getFloorsSummaryError = createSelector(getFloorsSummary, (state) => state?.error);