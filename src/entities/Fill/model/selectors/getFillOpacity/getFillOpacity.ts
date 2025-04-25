import { createSelector } from "@reduxjs/toolkit";
import { FillSchema } from "../../types/fillSchema";
import { getFill } from "../getFill/getFill";

export const getFillOpacity = createSelector(
  getFill,
  (fill: FillSchema) => fill.opacity
);