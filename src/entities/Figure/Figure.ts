export interface Figure {
    id: string;
    type: 'rectangle' | 'dottedLine';
    x: number;
    y: number;
    width?: number;
    height?: number;
    points?: number[];
    draggable: boolean;
    history: { x: number; y: number; }[];
}