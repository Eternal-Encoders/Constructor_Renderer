import { createSelector } from "@reduxjs/toolkit";
import { ImageSchema } from "../../types/imageSchema";
import { getImage } from "../getImage/getImage";

export const getImageName = createSelector(
  getImage,
  (image: ImageSchema) => image.name
);