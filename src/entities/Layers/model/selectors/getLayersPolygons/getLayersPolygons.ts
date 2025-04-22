import { createSelector } from "@reduxjs/toolkit";
import { FigureType } from "entities/Figure/Figure";
import { getLayersFigures } from "../getLayersFigures/getLayersFigures";

export const getLayersPolygons = createSelector(
  getLayersFigures,
  (figures) => figures.filter((figure) => figure.type === FigureType.Polygon))