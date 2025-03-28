export interface Rectangle {
    id: string;
    type: FigureType.Rectangle;
    x: number;
    y: number;
    width?: number;
    height?: number;
    draggable: boolean;
    history: { x: number; y: number; }[];
}

export interface Polygon {
    id: string;
    type: FigureType.Polygon;
    points: number[];
    isClosed: boolean;
    draggable: boolean;
    history: { points: number[]; }[];
}

export enum FigureType {
    Rectangle = 'rectangle',
    Polygon = 'polygon',
    None = 'none'
}

export interface Figure {
    rectangles: Rectangle[];
    polygons: Polygon[];
}