import { Polygon, Rectangle } from "entities/Figure/Figure";

export interface LayersSchema {
  figures: (Rectangle | Polygon)[]
}