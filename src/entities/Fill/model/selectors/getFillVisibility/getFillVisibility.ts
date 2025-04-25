import { createSelector } from "@reduxjs/toolkit";
import { FillSchema } from "../../types/fillSchema";
import { getFill } from "../getFill/getFill";

export const getFillVisibility = createSelector(
  getFill,
  (fill: FillSchema) => fill.visibility
);