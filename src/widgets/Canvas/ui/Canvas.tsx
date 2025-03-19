import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType } from "entities/Figure/Figure";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Layer, Stage } from "react-konva";
import { FigureRenderer } from "shared/ui/FigureRenderer/FigureRenderer";
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
        setFigures((prev) => [...prev, newFigure]);
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
                    <FigureRenderer figures={figures} selectedId={selectedId} selectedAction={selectedAction} setSelectedId={setSelectedId} />
                </Layer>
            </Stage>
        </div>
    );
};