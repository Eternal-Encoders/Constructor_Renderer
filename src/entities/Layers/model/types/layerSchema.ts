import { Polygon, Rectangle } from "entities/Figure";

export interface LayerSchema {
  figures: (Rectangle | Polygon)[];
}