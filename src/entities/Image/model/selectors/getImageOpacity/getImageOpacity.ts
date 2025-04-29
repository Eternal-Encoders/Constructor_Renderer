import { createSelector } from "@reduxjs/toolkit";
import { ImageSchema } from "../../types/imageSchema";
import { getImage } from "../getImage/getImage";

export const getImageOpacity = createSelector(
  getImage,
  (image: ImageSchema) => image.opacity
);