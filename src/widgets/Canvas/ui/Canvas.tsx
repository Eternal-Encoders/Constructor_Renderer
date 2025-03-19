import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType } from "entities/Figure/Figure";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { FigureRenderer } from "shared/ui/FigureRenderer/FigureRenderer";
import cls from './Canvas.module.scss';

interface ICanvasProps {
    className?: string;
    selectedId?: string;
    selectedFigure: FigureType;
    figures: Figure[];
    setSelectedId: (id: string | null) => void;
    setFigures: (figures: Figure[] | ((prev: Figure[]) => Figure[])) => void;
    scale: number;
    setScale: (scale: number) => void;
    selectedAction: ActionType;
}

export const Canvas = ({ className, figures, selectedId, selectedFigure,
    setSelectedId, setFigures, scale, setScale, selectedAction }
    : ICanvasProps) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!selectedId) return;
            console.log(event.keyCode);
            event.preventDefault();
            setFigures((prev) =>
                prev.map((fig) =>
                    fig.id === selectedId
                        ? {
                            ...fig,
                            x: fig.x + (event.keyCode === 39 ? 1 : event.keyCode === 37 ? -1 : 0),
                            y: fig.y + (event.keyCode === 40 ? 1 : event.keyCode === 38 ? -1 : 0),
                        }
                        : fig
                )
            );
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, setFigures]);

    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

    const onWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();

        const scaleBy = 1.1;
        const newScale = event.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
        if (newScale < 0.1 || newScale > 3) return;

        setScale(newScale);
    };

    // const onCanvasClick = (event: KonvaEventObject<MouseEvent>) => {
    //     if (!selectedFigure || selectedAction === ActionType.Drag || selectedId) return;

    //     const stage = event.target.getStage();
    //     if (!stage || event.target !== stage) return; // Чтобы не кликать по фигурам

    //     const pointer = stage.getPointerPosition();
    //     if (!pointer) return;
    //     console.log(event);
    //     console.log(canvasOffset);
    //     const x = (pointer.x - canvasOffset.x) / scale;
    //     const y = (pointer.y - canvasOffset.y) / scale;

    //     const newFigure: Figure = {
    //         id: `${selectedFigure}-${Date.now()}`,
    //         type: selectedFigure,
    //         x,
    //         y,
    //         width: selectedFigure === FigureType.Rectangle ? 100 : undefined,
    //         height: selectedFigure === FigureType.Rectangle ? 50 : undefined,
    //         points: selectedFigure === FigureType.DottedLine ? [0, 0, 100, 0] : undefined,
    //         draggable: true,
    //         history: [{ x, y }],
    //     };
    //     setFigures((prev) => [...prev, newFigure]);
    // };

    const onDragMove = (event: KonvaEventObject<DragEvent>) => {
        setCanvasOffset(event.target.attrs);
    };

    const [startPos, setStartPos] = useState<{ x: number, y: number; } | null>(null);
    const [tempFigure, setTempFigure] = useState<Figure | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setTempFigure(null);
                setStartPos(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getRelativePointerPosition = (stage: any) => {
        const pointer = stage.getPointerPosition();
        if (!pointer) return null;

        const stagePos = stage.position();
        return {
            x: (pointer.x - stagePos.x) / scale,
            y: (pointer.y - stagePos.y) / scale
        };
    };

    const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        if (selectedAction === ActionType.Drag) return;
        const stage = event.target.getStage();
        if (!stage) return;

        const pos = getRelativePointerPosition(stage);
        if (!pos) return;

        setStartPos(pos);
    };

    const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        if (!startPos) return;
        if (selectedAction === ActionType.Drag) return;

        const stage = event.target.getStage();
        if (!stage) return;

        const pos = getRelativePointerPosition(stage);
        if (!pos) return;

        setTempFigure({
            id: "temp",
            type: selectedFigure,
            x: Math.min(startPos.x, pos.x),
            y: Math.min(startPos.y, pos.y),
            width: Math.abs(pos.x - startPos.x),
            height: Math.abs(pos.y - startPos.y),
            draggable: false,
            history: [],
        });
    };

    const onMouseUp = (event: KonvaEventObject<MouseEvent>) => {
        if (!tempFigure) return;
        if (selectedAction === ActionType.Drag) return;

        setFigures((prev) => [...prev, { ...tempFigure, id: `${selectedFigure}-${Date.now()}` }]);
        setTempFigure(null);
        setStartPos(null);
    };

    return (
        <Stage
            className={classNames(cls.Stage, selectedAction === ActionType.Drag ? cls['grab_active'] : null,)}
            onWheel={onWheel}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            scale={{ x: scale, y: scale }}
            draggable={selectedAction === ActionType.Drag}
            onDragMove={onDragMove}
        >
            <Layer>
                <FigureRenderer
                    figures={[...figures, ...(tempFigure ? [tempFigure] : [])]}
                    selectedId={selectedId}
                    selectedAction={selectedAction}
                    setSelectedId={setSelectedId}
                    setFigures={setFigures}
                />
            </Layer>
        </Stage>
    );
};
