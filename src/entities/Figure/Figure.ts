export interface Rectangle {
  id: string;
  type: FigureType.Rectangle;
  index?: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  draggable: boolean;
  history: { x: number; y: number; }[];
  redoHistory?: { x: number; y: number; }[];
}

export interface Polygon {
  id: string;
  type: FigureType.Polygon;
  index?: number;
  x?: number;
  y?: number;
  points: number[];
  isClosed: boolean;
  draggable: boolean;
  history: { x: number; y: number; }[];
  redoHistory?: { x: number; y: number; }[];
}

export enum FigureType {
  Rectangle = 'Rectangle',
  Polygon = 'Polygon',
  None = 'none'
}

export interface Figure {
  rectangles: Rectangle[];
  polygons: Polygon[];
}