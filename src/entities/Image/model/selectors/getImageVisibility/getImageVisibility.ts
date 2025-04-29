import { createSelector } from "@reduxjs/toolkit";
import { ImageSchema } from "../../types/imageSchema";
import { getImage } from "../getImage/getImage";

export const getImageVisibility = createSelector(
  getImage,
  (image: ImageSchema) => image.visibility
);