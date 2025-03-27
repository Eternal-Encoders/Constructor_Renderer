import { ActionType } from "entities/Figure/Action";
import { Figure, Polygon, Rectangle } from "entities/Figure/Figure";
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
}

const MAGNETIC_DISTANCE = 10;

export const FigureRenderer = ({ className, figure, selectedId, selectedAction, setSelectedId, setRectangles, setPolygons }: IFigureRendererProps) => {
    const transformerRef = useRef<Konva.Transformer>(null);
    const selectedNodeRef = useRef<Konva.Node | null>(null);

    const [isHovered, setIsHovered] = useState(false);

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

    const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        if (selectedAction !== ActionType.Cursor) return;
        const node = e.target;
        const nodePos = node.position();

        let newX = nodePos.x;
        let newY = nodePos.y;

        figure.rectangles.forEach(fig => {
            if (fig.id === node.id()) return;
            const figRight = fig.x + (fig.width || 0);
            const figBottom = fig.y + (fig.height || 0);

            if (Math.abs(newX - figRight) <= MAGNETIC_DISTANCE) {
                newX = figRight;
            } else if (Math.abs(fig.x - (newX + (node.width() || 0))) <= MAGNETIC_DISTANCE) {
                newX = fig.x - (node.width() || 0);
            }

            if (Math.abs(newY - figBottom) <= MAGNETIC_DISTANCE) {
                newY = figBottom;
            } else if (Math.abs(fig.y - (newY + (node.height() || 0))) <= MAGNETIC_DISTANCE) {
                newY = fig.y - (node.height() || 0);
            }
        });

        node.position({ x: newX, y: newY });
        setRectangles((prev) =>
            prev.map((fig) =>
                fig.id === node.id() ? { ...fig, x: newX, y: newY } : fig
            )
        );
    };

    const onTransformEnd = (e: KonvaEventObject<Event>) => {
        const node = e.target;

        const newWidth = node.width() * node.scaleX();
        const newHeight = node.height() * node.scaleY();

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

        // Сбрасываем scale после обновления стейта
        node.scaleX(1);
        node.scaleY(1);
    };

    return (
        <>
            {figure.rectangles.map((fig) => (
                <Rect
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onDragStart={onDragStart}
                    key={fig.id}
                    {...fig}
                    fill={(selectedId === fig.id) ? "lightblue" : "#00D2FF"}
                    stroke="black"
                    strokeWidth={1}
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
            {figure.polygons.map((pol) => (
                <Line
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onDragStart={onDragStart}
                    key={pol.id}
                    points={pol.points}
                    stroke="black"
                    strokeWidth={1}
                    shadowBlur={1}
                    closed={pol.isClosed}
                    fill={pol.isClosed ? "rgba(0,0,255,0.3)" : "transparent"}
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
            ))}
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
