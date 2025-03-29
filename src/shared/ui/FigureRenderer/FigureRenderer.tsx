import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import { getMagneticPosition } from "helpers/getMagneticPosition";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { Line, Rect, Transformer } from "react-konva";

interface IFigureRendererProps {
    className?: string;
    selectedId?: string;
    figure: Figure;
    setRectangles: (rectangles: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])) => void;
    setPolygons: (rectangles: Polygon[] | ((prev: Polygon[]) => Polygon[])) => void;
    selectedAction: ActionType;
    setSelectedId: (id: string | null) => void;
    layerRef: React.RefObject<Konva.Layer | null>;
    scale: number;
}

export const FigureRenderer = ({ className, figure, selectedId, selectedAction, setSelectedId, setRectangles, setPolygons, layerRef, scale }: IFigureRendererProps) => {
    const transformerRef = useRef<Konva.Transformer>(null);
    const selectedNodeRef = useRef<Konva.Node | null>(null);

    const [idHovered, setIdHovered] = useState<string | null>(null);

    useEffect(() => {
        if (transformerRef.current) {
            if (selectedId) {
                const selectedNode = selectedNodeRef.current;
                if (selectedNode) {
                    transformerRef.current.nodes([selectedNode]);
                    transformerRef.current.getLayer()?.batchDraw();
                }
            } else {
                transformerRef.current.nodes([]);
                transformerRef.current.getLayer()?.batchDraw();
            }
        }
    }, [selectedId]);

    const onDragStart = (e: KonvaEventObject<DragEvent>) => {
        const node = e.target;

        if (node.attrs.type === FigureType.Rectangle) {
            setRectangles((prev) =>
                prev.map((fig) =>
                    fig.id === node.id()
                        ? { ...fig, history: [...fig.history, { x: fig.x, y: fig.y }] }
                        : fig
                )
            );
        } else if (node.attrs.type === FigureType.Polygon) {
            setPolygons((prev) =>
                prev.map((fig) =>
                    fig.id === node.id()
                        ? { ...fig, history: [...fig.history, { points: fig.points }] }
                        : fig
                )
            );
        }
    };

    const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        if (selectedAction !== ActionType.Cursor) return;

        const allFigures = [...figure.rectangles, ...figure.polygons];
        const node = e.target;

        const baseCoordinates = { x: node.x(), y: node.y() };

        const arrayOfNewCoordinates: { x: number; y: number; }[] = [];

        allFigures.forEach(fig => {
            if (fig.id === node.id()) return;
            const tempCoordinates = getMagneticPosition(layerRef, node, e.evt, fig, scale);
            if (tempCoordinates) {
                arrayOfNewCoordinates.push(tempCoordinates);
            }
        });

        const [newCoordinates] = arrayOfNewCoordinates.filter((coord) => coord.x !== baseCoordinates.x || coord.y !== baseCoordinates.y);

        if (!newCoordinates) {
            // Применяем базовые координаты
            node.position({ x: baseCoordinates.x, y: baseCoordinates.y });
        } else {
            // Применяем скорректированные координаты
            node.position({ x: newCoordinates.x, y: newCoordinates.y });
        }

        if (node.attrs.type === FigureType.Rectangle) {
            setRectangles((prev) =>
                prev.map((fig) =>
                    fig.id === node.id()
                        ? {
                            ...fig,
                            ...newCoordinates ?? { ...baseCoordinates },
                        }
                        : fig
                )
            );
        }
        else if (node.attrs.type === FigureType.Polygon) {
            setPolygons((prev) =>
                prev.map((fig) =>
                    fig.id === node.id()
                        ? {
                            ...fig,
                            points: fig.points,
                            ...newCoordinates ?? { ...baseCoordinates },
                        }
                        : fig
                )
            );
        }
    };

    const onTransformEnd = (e: KonvaEventObject<Event>) => {
        const node = e.target;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        const newWidth = node.width() * scaleX;
        const newHeight = node.height() * scaleY;

        // Проверка на прямоугольник, т.к. у него type - rectangle, а у мног-ка undefined
        if (node.attrs.type === FigureType.Rectangle) {
            setRectangles((prev) =>
                prev.map((fig) =>
                    fig.id === node.id()
                        ? {
                            ...fig,
                            x: node.x(),
                            y: node.y(),
                            width: newWidth,
                            height: newHeight,
                        }
                        : fig
                )
            );
        } else if (node.attrs.type === FigureType.Polygon) {
            setPolygons((prev) =>
                prev.map((fig: Polygon) =>
                    fig.id === node.id()
                        ? {
                            id: fig.id,
                            points: fig.points.map((p, i) =>
                                i % 2 === 0 ? p * scaleX : p * scaleY // Масштабируем x и y координаты
                            ),
                            x: node.x(),
                            y: node.y(),
                            history: fig.history,
                            isClosed: fig.isClosed,
                            draggable: fig.draggable,
                            type: fig.type,
                        }
                        : fig
                )
            );
        }

        // Сбрасываем scale после обновления стейта
        node.scaleX(1);
        node.scaleY(1);
    };

    return (
        <>
            {figure.rectangles.map((fig) => (
                <Rect
                    onMouseEnter={(evt) => setIdHovered(evt.target.id())}
                    onMouseLeave={() => setIdHovered(null)}
                    key={fig.id}
                    name="rect"
                    {...fig}
                    id={fig.id}
                    type={fig.type}
                    fill={(selectedId === fig.id) ? "lightblue" : "#00D2FF"}
                    stroke={idHovered === fig.id ? "blue" : "black"}
                    strokeWidth={idHovered === fig.id ? 2 : 1}
                    shadowBlur={1}
                    draggable={selectedAction === ActionType.Cursor}
                    onDragStart={onDragStart}
                    onDragMove={onDragMove}
                    onTransformEnd={onTransformEnd}
                    onClick={(e) => {
                        if (selectedAction !== ActionType.Cursor) return;
                        e.cancelBubble = true;
                        setSelectedId(fig.id);
                        selectedNodeRef.current = e.target;
                    }}
                    ref={(node) => {
                        if (selectedId === fig.id) {
                            selectedNodeRef.current = node;
                        }
                    }}
                />
            ))}
            {figure.polygons.map((pol) => {
                return (
                    <Line
                        onMouseEnter={(evt) => setIdHovered(evt.target.id())}
                        onMouseLeave={() => setIdHovered(null)}
                        key={pol.id}
                        name="polygon"
                        {...pol.isClosed ? { ...pol } : null}
                        id={pol.id}
                        type={pol.type}
                        points={pol.points}
                        stroke={idHovered === pol.id ? "blue" : "black"}
                        strokeWidth={idHovered === pol.id ? 2 : 1}
                        shadowBlur={1}
                        closed={pol.isClosed}
                        fill={"transparent"}
                        draggable={selectedAction === ActionType.Cursor}
                        onDragStart={onDragStart}
                        onDragMove={onDragMove}
                        onTransformEnd={onTransformEnd}
                        onClick={(e) => {
                            if (selectedAction !== ActionType.Cursor) return;
                            e.cancelBubble = true;
                            setSelectedId(pol.id);
                            selectedNodeRef.current = e.target;
                        }}
                        ref={(node) => {
                            if (selectedId === pol.id) {
                                selectedNodeRef.current = node;
                            }
                        }}
                    />
                );
            })}
            <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
        </>
    );
};