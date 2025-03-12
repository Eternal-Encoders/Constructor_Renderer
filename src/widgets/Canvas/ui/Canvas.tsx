import classNames from "classnames";
import { Figure } from "entities/Figure/Figure";
import Konva from "konva";
import { Layer, Line, Rect, Stage } from "react-konva";
import cls from "./Canvas.module.scss";

interface ICanvasProps {
    className?: string;
    selectedId?: string;
    figures: Figure[];
    handleDragMove: (id: string, e: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragEnd: (id: string, e: Konva.KonvaEventObject<DragEvent>) => void;
    setSelectedId: (props: string | null) => void;
}

export const Canvas = ({ className, figures, selectedId, handleDragMove, handleDragEnd, setSelectedId }: ICanvasProps) => {
    return (
        <div className={classNames(cls.Canvas, {}, [className])} style={{ width: window.innerWidth / 2, height: window.innerHeight / 2 }}>
            <Stage width={window.innerWidth / 2} height={window.innerHeight / 2} onClick={() => setSelectedId(null)}>
                <Layer>
                    {figures.map((fig: Figure) =>
                        fig.type === 'rectangle' ? (
                            <Rect
                                key={fig.id}
                                x={fig.x}
                                y={fig.y}
                                width={fig.width}
                                height={fig.height}
                                fill={selectedId === fig.id ? 'lightblue' : '#00D2FF'}
                                stroke="black"
                                strokeWidth={2}
                                draggable
                                onClick={(e) => {
                                    e.cancelBubble = true;
                                    setSelectedId(fig.id);
                                }}
                                onDragMove={(e) => handleDragMove(fig.id, e)}
                                onDragEnd={(e) => handleDragEnd(fig.id, e)}
                            />
                        ) : (
                            <Line
                                key={fig.id}
                                x={fig.x}
                                y={fig.y}
                                points={fig.points!}
                                stroke="black"
                                strokeWidth={2}
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
                        )
                    )}
                </Layer>
            </Stage>
        </div>
    );
};
