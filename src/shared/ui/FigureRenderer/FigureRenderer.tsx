import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Stage } from "konva/lib/Stage";
import { IRect } from "konva/lib/types";
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
}

const MAGNETIC_DISTANCE = 10;

export const FigureRenderer = ({ className, figure, selectedId, selectedAction, setSelectedId, setRectangles, setPolygons, layerRef, }: IFigureRendererProps) => {
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
        setRectangles((prev) =>
            prev.map((fig) =>
                fig.id === node.id()
                    ? { ...fig, history: [...fig.history, { x: fig.x, y: fig.y }] }
                    : fig
            )
        );
    };

    const doMagneticForRectangle = (node: Shape<ShapeConfig> | Stage,
        nodeBox: IRect, newY: number,
        newX: number, borderOffset: number, fig: Rectangle) => {
        const figRight = fig.x + (fig.width || 0);
        const figBottom = fig.y + (fig.height || 0);

        if (Math.abs(newX - figRight) <= MAGNETIC_DISTANCE) {
            newX = figRight;
        } else if (Math.abs(fig.x - (newX + (nodeBox.width - borderOffset || 0))) <= MAGNETIC_DISTANCE) {
            newX = fig.x - (nodeBox.width - borderOffset || 0);
        }

        if (Math.abs(newY - figBottom) <= MAGNETIC_DISTANCE) {
            newY = figBottom;
        } else if (Math.abs(fig.y - (newY + (nodeBox.height - borderOffset || 0))) <= MAGNETIC_DISTANCE) {
            newY = fig.y - (nodeBox.height - borderOffset || 0);
        }

        node.position({ x: newX, y: newY });
        setRectangles((prev) =>
            prev.map((fig) =>
                fig.id === node.id() ? { ...fig, x: newX, y: newY } : fig
            )
        );
    };

    const doMagneticForPolygonRectangle = (node: Shape<ShapeConfig> | Stage,
        nodeBox: IRect, newY: number,
        newX: number, borderOffset: number, fig: Rectangle | Polygon) => {
        if (!layerRef.current) return;
        const figNodeBox = layerRef.current.findOne(`#${fig.id}`);
        if (!figNodeBox) return;
        const polNodeBox = figNodeBox?.getClientRect();

        const figRight = polNodeBox.x + (polNodeBox.width || 0);
        const figBottom = polNodeBox.y + (polNodeBox.height || 0);


        if (Math.abs(newX - figRight) <= MAGNETIC_DISTANCE) {
            newX = figRight;
        } else if (Math.abs(nodeBox.x + nodeBox.width - polNodeBox.x) <= MAGNETIC_DISTANCE) {
            newX += Math.abs(nodeBox.x + nodeBox.width - polNodeBox.x) + borderOffset;
        }

        if (Math.abs(newY - figBottom) <= MAGNETIC_DISTANCE) {
            newY = figBottom;
        } else if (Math.abs(fig.y - (newY + (nodeBox.height - borderOffset || 0))) <= MAGNETIC_DISTANCE) {
            newY += Math.abs(nodeBox.y + nodeBox.height - polNodeBox.y) + borderOffset;
        }

        node.position({ x: newX, y: newY });
        setRectangles((prev) =>
            prev.map((fig) =>
                fig.id === node.id() ? { ...fig, x: newX, y: newY } : fig
            )
        );
    };

    const doMagneticForPolygon = (node: Shape<ShapeConfig> | Stage,
        nodeBox: IRect, newY: number,
        newX: number, borderOffset: number, fig: Rectangle | Polygon) => {
        if (!layerRef.current) return;
        newY = node.y();
        newX = node.x();
        const figNodeBox = layerRef.current.findOne(`#${fig.id}`);
        if (!figNodeBox) return;
        const rectNodeBox = figNodeBox?.getClientRect();

        const figRight = rectNodeBox.x + (rectNodeBox.width || 0);
        const figBottom = rectNodeBox.y + (rectNodeBox.height || 0);

        if (Math.abs(nodeBox.x + nodeBox.width - rectNodeBox.x) <= MAGNETIC_DISTANCE) {
            newX = node.x() + Math.abs(nodeBox.x + nodeBox.width - rectNodeBox.x) + borderOffset;
        } else if (Math.abs(nodeBox.x - figRight) <= MAGNETIC_DISTANCE) {
            newX = node.x() - Math.abs(nodeBox.x - figRight) - borderOffset;
        }

        if (Math.abs(nodeBox.y - figBottom) <= MAGNETIC_DISTANCE) {
            newY = node.y() - Math.abs(nodeBox.y - figBottom) - borderOffset;
        }
        else if (Math.abs(nodeBox.y + nodeBox.height - rectNodeBox.y) <= MAGNETIC_DISTANCE) {
            newY = node.y() + Math.abs(nodeBox.y + nodeBox.height - rectNodeBox.y) + borderOffset;
        }

        node.position({ x: newX, y: newY });
        setPolygons((prev) =>
            prev.map((fig) =>
                fig.id === node.id() ? { ...fig, x: newX, y: newY } : fig
            )
        );
    };

    const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        if (selectedAction !== ActionType.Cursor) return;

        const allFigures = [...figure.rectangles, ...figure.polygons];

        const borderOffset = 3;
        const node = e.target;
        const nodeBox = node.getClientRect();
        const newX = nodeBox.x;
        const newY = nodeBox.y;

        allFigures.forEach(fig => {
            if (fig.id === node.id()) return;
            switch (fig.type) {
                case (FigureType.Rectangle):
                    switch (node.attrs.type) {
                        case (FigureType.Rectangle):
                            doMagneticForRectangle(node, nodeBox, newY, newX, borderOffset, fig);
                            break;
                        case (FigureType.Polygon):
                            doMagneticForPolygon(node, nodeBox, newY, newX, borderOffset, fig);
                            break;
                    }
                    break;
                case (FigureType.Polygon):
                    switch (node.attrs.type) {
                        case (FigureType.Rectangle):
                            doMagneticForPolygonRectangle(node, nodeBox, newY, newX, borderOffset, fig);
                            break;
                        case (FigureType.Polygon):
                            doMagneticForPolygon(node, nodeBox, newY, newX, borderOffset, fig);
                            break;
                    }
                    break;
            }
        });
    };

    const onTransformEnd = (e: KonvaEventObject<Event>) => {
        const node = e.target;

        const newWidth = node.width() * node.scaleX();
        const newHeight = node.height() * node.scaleY();

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
                    onDragStart={onDragStart}
                    key={fig.id}
                    {...fig}
                    id={fig.id}
                    type={fig.type}
                    fill={(selectedId === fig.id) ? "lightblue" : "#00D2FF"}
                    stroke={idHovered === fig.id ? "blue" : "black"}
                    strokeWidth={idHovered === fig.id ? 2 : 1}
                    shadowBlur={1}
                    draggable={selectedAction === ActionType.Cursor}
                    onDragMove={onDragMove}
                    onClick={(e) => {
                        if (selectedAction !== ActionType.Cursor) return;
                        e.cancelBubble = true;
                        setSelectedId(fig.id);
                        selectedNodeRef.current = e.target;
                    }}
                    onTransformEnd={onTransformEnd}
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
                        onDragStart={onDragStart}
                        key={pol.id}
                        id={pol.id}
                        type={pol.type}
                        points={pol.points}
                        stroke={idHovered === pol.id ? "blue" : "black"}
                        strokeWidth={idHovered === pol.id ? 2 : 1}
                        shadowBlur={1}
                        closed={pol.isClosed}
                        fill={"transparent"}
                        draggable={selectedAction === ActionType.Cursor}
                        onDragMove={onDragMove}
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
