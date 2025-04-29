import { createSelector } from "@reduxjs/toolkit";
import { getLayers } from "../getLayers/getLayers";

export const getLayersFigures = createSelector(getLayers, layers => layers.figures);