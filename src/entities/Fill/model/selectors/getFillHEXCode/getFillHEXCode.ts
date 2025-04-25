import { createSelector } from "@reduxjs/toolkit";
import { FillSchema } from "../../types/fillSchema";
import { getFill } from "../getFill/getFill";

export const getFillHEXCode = createSelector(
  getFill,
  (fill: FillSchema) => fill.hexCode
);