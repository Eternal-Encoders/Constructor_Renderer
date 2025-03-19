import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType } from "entities/Figure/Figure";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import cls from "./Canvas.module.scss";

interface ICanvasProps {
    className?: string;
    selectedId?: string;
    selectedFigure: FigureType | null;
    figures: Figure[];
    setSelectedId: (id: string | null) => void;
    setFigures: (figures: Figure[] | ((prev: Figure[]) => Figure[])) => void;
    scale: number;
    setScale: (scale: number) => void;
    selectedAction: ActionType;
}

export const Canvas = ({ className, figures, selectedId, selectedFigure, setSelectedId, setFigures, scale, setScale, selectedAction }: ICanvasProps) => {
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        if (selectedAction === ActionType.Cursor) return;
        setIsDragging(true);
        setLastMousePos({ x: e.evt.clientX, y: e.evt.clientY });
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if (!isDragging || selectedAction === ActionType.Cursor) return;
        setCanvasOffset(prev => ({
            x: prev.x + (e.evt.clientX - lastMousePos.x),
            y: prev.y + (e.evt.clientY - lastMousePos.y),
        }));
        setLastMousePos({ x: e.evt.clientX, y: e.evt.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    const onWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();
        const stage = event.target.getStage();
        if (!stage) return;
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const scaleBy = 1.1;
        const newScale = event.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
        if (newScale < 0.1 || newScale > 3) return;

        setScale(newScale);
        setCanvasOffset({
            x: pointer.x - (pointer.x - canvasOffset.x) * (newScale / scale),
            y: pointer.y - (pointer.y - canvasOffset.y) * (newScale / scale),
        });
    };

    const onCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!selectedFigure || selectedAction === ActionType.Drag || selectedId) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - canvasOffset.x) / scale;
        const y = (event.clientY - rect.top - canvasOffset.y) / scale;

        const newFigure: Figure = {
            id: `${selectedFigure}-${Date.now()}`,
            type: selectedFigure,
            x,
            y,
            width: selectedFigure === FigureType.Rectangle ? 100 : undefined,
            height: selectedFigure === FigureType.Rectangle ? 50 : undefined,
            points: selectedFigure === FigureType.DottedLine ? [0, 0, 100, 0] : undefined,
            draggable: true,
            history: [{ x, y }],
        };
        setFigures([...figures, newFigure]);
    };

    return (
        <div onMouseUp={onCanvasClick} className={classNames(cls.Canvas, {}, [className])}>
            <Stage
                onWheel={onWheel}
                width={window.innerWidth / 2}
                height={window.innerHeight / 2}
                onClick={() => setSelectedId(null)}
                scale={{ x: scale, y: scale }}
                x={canvasOffset.x}
                y={canvasOffset.y}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    {figures.map((fig) => {
                        if (fig.type === FigureType.Rectangle) {
                            return (
                                <Rect
                                    key={fig.id}
                                    x={fig.x}
                                    y={fig.y}
                                    width={fig.width}
                                    height={fig.height}
                                    fill={selectedId === fig.id ? 'lightblue' : '#00D2FF'}
                                    stroke="black"
                                    strokeWidth={1}
                                    shadowBlur={1}
                                    draggable={selectedAction !== ActionType.Drag}
                                    onClick={(e) => {
                                        if (selectedAction === ActionType.Drag) return;
                                        e.cancelBubble = true;
                                        setSelectedId(fig.id);
                                    }}
                                />
                            );
                        }
                        if (fig.type === FigureType.DottedLine) {
                            return (
                                <Line
                                    key={fig.id}
                                    x={fig.x}
                                    y={fig.y}
                                    points={fig.points!}
                                    stroke="black"
                                    strokeWidth={1}
                                    lineCap="round"
                                    lineJoin="round"
                                    dash={[10, 5]}
                                    draggable={selectedAction !== ActionType.Drag}
                                    onClick={(e) => {
                                        if (selectedAction === ActionType.Drag) return;
                                        e.cancelBubble = true;
                                        setSelectedId(fig.id);
                                    }}
                                />
                            );
                        }
                        return null;
                    })}
                </Layer>
            </Stage>
        </div>
    );
};