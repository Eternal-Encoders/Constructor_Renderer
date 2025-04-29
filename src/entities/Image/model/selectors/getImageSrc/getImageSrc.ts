import { createSelector } from "@reduxjs/toolkit";
import { ImageSchema } from "../../types/imageSchema";
import { getImage } from "../getImage/getImage";

export const getImageSrc = createSelector(
  getImage,
  (image: ImageSchema) => image.src
);