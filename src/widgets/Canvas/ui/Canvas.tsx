import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { FigureRenderer } from "shared/ui/FigureRenderer/FigureRenderer";
import cls from './Canvas.module.scss';

interface ICanvasProps {
    className?: string;
    selectedId?: string;
    selectedFigure: FigureType;
    polygons: Polygon[];
    setPolygons: (polygons: Polygon[] | ((prev: Polygon[]) => Polygon[])) => void;
    rectangles: Rectangle[];
    setRectangles: (rectangles: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])) => void;
    scale: number;
    setScale: (scale: number) => void;
    selectedAction: ActionType;
    setSelectedId: (id: string | null) => void;
}

export const Canvas = ({ className, polygons, setPolygons, rectangles, selectedId, selectedFigure,
    setSelectedId, setRectangles, scale, setScale, selectedAction }
    : ICanvasProps) => {

    // Handler figure's movement to press on keys.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!selectedId) return;
            event.preventDefault();

            setRectangles((prev) =>
                prev.map((fig) =>
                    fig.id === selectedId
                        ? {
                            ...fig,
                            history: [...fig.history, { x: fig.x, y: fig.y }], // Добавляем текущее положение в историю
                            x: fig.x + (event.keyCode === 39 ? 1 : event.keyCode === 37 ? -1 : 0),
                            y: fig.y + (event.keyCode === 40 ? 1 : event.keyCode === 38 ? -1 : 0),
                        }
                        : fig
                )
            );
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, setRectangles]);


    // Set new scale by wheeling up or down
    const onWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();

        const scaleBy = 1.1;
        const newScale = event.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
        if (newScale < 0.1 || newScale > 3) return;

        setScale(newScale);
    };

    const [startPos, setStartPos] = useState<{ x: number, y: number; } | null>(null);
    const [tempRectangle, setTempRectangle] = useState<Rectangle | null>(null);
    const [tempLine, setTempLine] = useState<Polygon | null>(null);

    const [points, setPoints] = useState<number[]>([]);
    const [isClosed, setIsClosed] = useState(false);

    // Handler figure's temp cancel when press on Escape.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (selectedFigure === FigureType.Rectangle) {
                    setTempRectangle(null);
                    setStartPos(null);
                }
                else if (selectedFigure === FigureType.Polygon) {
                    setTempLine(null);
                    setPoints([]);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedFigure]);

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

    // Handler of downClick
    const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        const stage = event.target.getStage();
        // If click on white stage then selectedId = null
        if (selectedAction === ActionType.Cursor) {
            if (selectedId && event.target === stage) { setSelectedId(null); return; };
        }
        if (selectedAction !== ActionType.None) return;
        if (!stage) return;

        const pos = getRelativePointerPosition(stage);
        if (!pos) return;

        // Set start pos on what you clicked
        if (selectedFigure === FigureType.Rectangle)
            setStartPos(pos);
        else if (selectedFigure === FigureType.Polygon) {
            // Если есть как минимум две точки
            if (points.length >= 4) {
                const [firstX, firstY] = points;
                const distance = Math.hypot(pos.x - firstX, pos.y - firstY);
                // Если первая точка близко находится с последней, тогда закрываем
                if (distance < 3) {
                    // const closedPoints = [...points, points[points.length - 2], points[points.length - 1]];
                    setPolygons([...polygons, {
                        points, isClosed: true,
                        id: `${selectedFigure}-${Date.now()}`,
                        draggable: true, history: [], type: FigureType.Polygon
                    }]);
                    setTempLine(null);
                    setPoints([]);
                    return;
                }
            }

            setPoints([...points, pos.x, pos.y]);
        }
    };

    // Handler of mouseMoving
    const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        // Если выбранное действие - это ни ничего, то выходим 
        if (selectedAction !== ActionType.None) return;

        const stage = event.target.getStage();
        if (!stage) return;

        const pos = getRelativePointerPosition(stage);
        if (!pos) return;

        if (selectedFigure === FigureType.Rectangle) {
            if (!startPos) return;
            setTempRectangle({
                id: "temp-rectangle",
                type: selectedFigure,
                x: Math.min(startPos.x, pos.x),
                y: Math.min(startPos.y, pos.y),
                width: Math.abs(pos.x - startPos.x),
                height: Math.abs(pos.y - startPos.y),
                draggable: false,
                history: [],
            });
        }

        else if (selectedFigure === FigureType.Polygon) {
            if (!points.length) return;
            setTempLine({
                id: "temp-line",
                type: selectedFigure,
                draggable: false,
                history: [],
                isClosed: isClosed,
                points: [...points, pos.x, pos.y],
            });
        }
    };

    // Handler of upClick
    const onMouseUp = (event: KonvaEventObject<MouseEvent>) => {
        if (selectedAction !== ActionType.None) return;

        if (selectedFigure === FigureType.Rectangle) {
            if (!tempRectangle) return;
            // Проверяем минимальный размер перед добавлением
            if (tempRectangle.width !== undefined && tempRectangle.height !== undefined
                && (tempRectangle.width < 5 || tempRectangle.height < 5)) {
                setTempRectangle(null);
                setStartPos(null);
                return;
            }

            setRectangles((prev) => [...prev, {
                ...tempRectangle,
                id: `${selectedFigure}-${Date.now()}`
            }]);
            setTempRectangle(null);
            setStartPos(null);
        } else if (selectedFigure === FigureType.Polygon) {
            if (!tempLine) return;
            if (isClosed) {
                setPolygons((prev) => [...prev, { ...tempLine, id: `${selectedFigure}-${Date.now()}` }]);
                setTempLine(null);
                setPoints([]);
                setIsClosed(false);
            }

        }

    };

    return (
        <Stage
            className={classNames(cls.Stage, selectedAction === ActionType.Drag ? cls['grab_active'] : null,)}
            onWheel={onWheel}
            width={625}
            height={916}
            // width={window.innerWidth}
            // height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            scale={{ x: scale, y: scale }}
            draggable={selectedAction === ActionType.Drag}
        >
            <Layer>
                <FigureRenderer
                    figure={{
                        rectangles: [...rectangles,
                        ...(tempRectangle ? [tempRectangle] : [])],
                        polygons: [...polygons, ...(tempLine ? [tempLine] : [])]
                    }}
                    selectedId={selectedId}
                    selectedAction={selectedAction}
                    setSelectedId={setSelectedId}
                    setRectangles={setRectangles}
                    setPolygons={setPolygons}
                />
            </Layer>
        </Stage>
    );
};
