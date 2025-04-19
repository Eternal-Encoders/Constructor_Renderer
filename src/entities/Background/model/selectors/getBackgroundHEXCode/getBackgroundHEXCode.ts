import { createSelector } from "@reduxjs/toolkit";
import { BackgroundSchema } from "../../types/backgroundSchema";
import { getBackground } from "../getBackround/getBackground";

export const getBackgroundHEXCode = createSelector(
  getBackground,
  (background: BackgroundSchema) => background.hexCode
);