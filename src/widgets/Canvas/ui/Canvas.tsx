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

    const onWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();

        const scaleBy = 1.1;
        const newScale = event.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
        if (newScale < 0.1 || newScale > 3) return;

        setScale(newScale);
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
        if (selectedAction === ActionType.Cursor) {
            if (selectedId && event.target === event.target.getStage()) { setSelectedId(null); return; };
        }
        if (selectedAction !== ActionType.None) return;
        const stage = event.target.getStage();
        if (!stage) return;

        const pos = getRelativePointerPosition(stage);
        if (!pos) return;

        setStartPos(pos);
    };

    const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        if (!startPos) return;
        if (selectedAction !== ActionType.None) return;

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
        if (selectedAction !== ActionType.None) return;
        if (!tempFigure) return;

        // Проверяем минимальный размер перед добавлением
        if (tempFigure.width !== undefined && tempFigure.height !== undefined && (tempFigure.width < 5 || tempFigure.height < 5)) {
            setTempFigure(null);
            setStartPos(null);
            return;
        }

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
