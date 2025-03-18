import classNames from "classnames";
import { Figure, FigureType } from "entities/Figure/Figure";
import Konva from "konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { MouseEvent as ReactMouseEvent, useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import cls from "./Canvas.module.scss";

interface ICanvasProps {
    className?: string;
    selectedId?: string;
    selectedFigure: FigureType | null;
    figures: Figure[];
    setSelectedId: (props: string | null) => void;
    setFigures: (props: Figure[] | ((prev: Figure[]) => Figure[])) => void;
    scale: number | null;
    setScale: (props: number) => void;
}

export const Canvas = ({ className, figures, selectedId, selectedFigure, setSelectedId, setFigures, scale, setScale, }: ICanvasProps) => {

    const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth / 2, height: window.innerHeight / 2 });

    // Задаём деффолтное значение для скалирования.
    if (scale === null) scale = 1;

    const strokeWidth = 1;
    const magneticDistance = 5;

    function tryMagneticCanvasBorders(e: Konva.KonvaEventObject<DragEvent>) {
        if (e.target.x() < 0) e.target.x(0); // Не даем выходить за границы верхнего левого угла
        if (e.target.y() < 0) e.target.y(0); // Не даем выходить за границы верхнего левого угла

        // Не даем выходить за границы нижнего левого угла
        if (e.target.y() + e.target.attrs.height + strokeWidth >= canvasSize.height)
            e.target.y(canvasSize.height - e.target.attrs.height - strokeWidth);
        // Не даем выходить за границы нижнего правого угла
        if (e.target.x() + e.target.attrs.width + strokeWidth >= canvasSize.width)
            e.target.x(canvasSize.width - e.target.attrs.width - strokeWidth);

        // Примагничивание к левым верхним границам
        if (e.target.x() <= magneticDistance && e.target.x() > 0) e.target.x(0);
        if (e.target.y() <= magneticDistance && e.target.y() > 0) e.target.y(0);

        // Примагничивание к правым нижнимграницам
        if (e.target.x() + e.target.attrs.width + strokeWidth <= canvasSize.width && e.target.x() +
            e.target.attrs.width + strokeWidth >= canvasSize.width - magneticDistance)
            e.target.x(canvasSize.width - e.target.attrs.width - strokeWidth);
        if (e.target.y() + e.target.attrs.height + strokeWidth <= canvasSize.height && e.target.y() +
            e.target.attrs.height + strokeWidth >= canvasSize.height - magneticDistance)
            e.target.y(canvasSize.height - e.target.attrs.height - strokeWidth);
    }

    function tryMagneticFigureBorders(id: string, e: KonvaEventObject<DragEvent, Node<NodeConfig>>) {
        figures.forEach((fig: Figure) => {
            // Проверять все фигуры кроме таргета
            if (fig.id === id) return;
            // Проверить на rectangle
            if (fig.width !== undefined && fig.height !== undefined) {
                // Проверка на примагничивание к правому краю фигуры
                if (Math.abs(fig.x + fig.width + strokeWidth - e.target.x()) < magneticDistance) {
                    e.target.x(fig.x + fig.width + strokeWidth);
                }
                // Проверка на примагничивание к нижнему краю фигуры
                else if (Math.abs(fig.y + fig.height + strokeWidth - e.target.y()) < magneticDistance) {
                    e.target.y(fig.y + fig.height + strokeWidth);
                }
                // Проверка на примагничивание к левому краю фигуры
                else if (Math.abs(fig.x + strokeWidth - (e.target.x() + e.target.attrs.width)) < magneticDistance) {
                    e.target.x(fig.x - strokeWidth - e.target.attrs.width);
                }
                // Проверка на примагничивание к верхнему краю фигуры
                else if (Math.abs(fig.y + strokeWidth - (e.target.y() + e.target.attrs.height)) < magneticDistance) {
                    e.target.y(fig.y - strokeWidth - e.target.attrs.height);
                }
            }
        });
    }

    const handleDragMove = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
        //e.target.x() - координата x объекта (левый верхний угол фигуры)
        //e.target.y() - координата y объекта (левый верхний угол фигуры)
        // console.log(`width: ${e.target.x()}, height: ${e.target.y()}, e.evt.offsetX: ${e.evt.offsetX}, e.evt.offsetY: ${e.evt.offsetY}`);

        tryMagneticCanvasBorders(e);

        tryMagneticFigureBorders(id, e);

        // setFigures((prev: Figure[]) =>
        //     prev.map((fig: Figure) =>
        //         fig.id === id
        //             ? { ...fig, x: e.target.x(), y: e.target.y() }
        //             : fig
        //     )
        // );
    };

    const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
        const { x, y } = e.target.position();

        const newX = x;
        const newY = y;

        setFigures((prev: Figure[]) =>
            prev.map((fig: Figure) =>
                fig.id === id
                    ? { ...fig, x: newX, y: newY, history: [...fig.history, { x: newX, y: newY }] }
                    : fig
            )
        );
    };

    const onWheel = (event: KonvaEventObject<WheelEvent, Node<NodeConfig>>) => {
        return event.evt.deltaY > 0 ?
            scale <= 0.2 ?
                null : setScale(scale! - 0.1) :
            scale >= 3 ?
                null : setScale(scale! + 0.1);
    };

    const onMouseUp = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        console.log(event);
        if (selectedFigure !== null) {
            const newFigure: Figure = {
                id: `${selectedFigure}-${Date.now()}`,
                type: selectedFigure,
                x: event.pageX - event.currentTarget.offsetLeft - (100 / 2),
                y: selectedFigure === FigureType.DottedLine ? event.pageY - event.currentTarget.offsetTop : event.pageY - event.currentTarget.offsetTop - (50 / 2),
                width: selectedFigure === FigureType.Rectangle ? 100 : undefined,
                height: selectedFigure === FigureType.Rectangle ? 50 : undefined,
                points: selectedFigure === FigureType.DottedLine ? [0, 0, 100, 0] : undefined,
                draggable: true,
                history: [],
            };
            setFigures([...figures, newFigure]);
        }
    };

    return (
        <div
            onMouseUp={(event) => onMouseUp(event)}
            className={classNames(cls.Canvas, {}, [className])}
            style={{ width: canvasSize.width, height: canvasSize.height }}>
            <Stage
                onWheel={(event) => onWheel(event)}
                width={canvasSize.width}
                height={canvasSize.height}
                onClick={() => setSelectedId(null)}
                scale={{ x: scale, y: scale }}
            >
                <Layer>
                    {figures.map((fig: Figure) => {
                        switch (fig.type) {
                            case FigureType.Rectangle:
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
                                        draggable
                                        onClick={(e) => {
                                            e.cancelBubble = true;
                                            setSelectedId(fig.id);
                                        }}
                                        onDragMove={(e) => handleDragMove(fig.id, e)}
                                        onDragEnd={(e) => handleDragEnd(fig.id, e)}
                                    />
                                );
                            case FigureType.DottedLine:
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
                                        draggable
                                        onClick={(e) => {
                                            e.cancelBubble = true;
                                            setSelectedId(fig.id);
                                        }}
                                        onDragMove={(e) => handleDragMove(fig.id, e)}
                                        onDragEnd={(e) => handleDragEnd(fig.id, e)}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

