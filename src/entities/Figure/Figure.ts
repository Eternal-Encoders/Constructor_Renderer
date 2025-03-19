export interface Figure {
    id: string;
    type: FigureType;
    x: number;
    y: number;
    width?: number;
    height?: number;
    points?: number[];
    draggable: boolean;
    history: { x: number; y: number; }[];
}

export enum FigureType {
    Rectangle = 'rectangle',
    Pen = 'pen',
    None = 'none'
}