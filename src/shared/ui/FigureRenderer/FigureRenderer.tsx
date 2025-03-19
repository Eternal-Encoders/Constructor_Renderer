import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType } from "entities/Figure/Figure";
import { KonvaEventObject } from "konva/lib/Node";
import { Rect } from "react-konva";

interface IFigureRendererProps {
    className?: string;
    selectedId?: string;
    figures: Figure[];
    setFigures: (figures: Figure[] | ((prev: Figure[]) => Figure[])) => void;
    selectedAction: ActionType;
    setSelectedId: (id: string | null) => void;
}

const MAGNETIC_DISTANCE = 10;

export const FigureRenderer = ({ className, figures, selectedId, selectedAction, setSelectedId, setFigures }: IFigureRendererProps) => {
    const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        const node = e.target;
        const nodePos = node.position();

        let newX = nodePos.x;
        let newY = nodePos.y;

        figures.forEach(fig => {
            if (fig.id === node.id()) return;

            const figRight = fig.x + (fig.width || 0);
            const figBottom = fig.y + (fig.height || 0);

            // Проверка примагничивания по горизонтали
            if (Math.abs(newX - figRight) <= MAGNETIC_DISTANCE) {
                newX = figRight;
            } else if (Math.abs(fig.x - (newX + (node.width() || 0))) <= MAGNETIC_DISTANCE) {
                newX = fig.x - (node.width() || 0);
            }

            // Проверка примагничивания по вертикали
            if (Math.abs(newY - figBottom) <= MAGNETIC_DISTANCE) {
                newY = figBottom;
            } else if (Math.abs(fig.y - (newY + (node.height() || 0))) <= MAGNETIC_DISTANCE) {
                newY = fig.y - (node.height() || 0);
            }
        });

        node.position({ x: newX, y: newY });
        // Обновление состояния фигур
        setFigures((prev) =>
            prev.map((fig) =>
                fig.id === node.id()
                    ? { ...fig, x: newX, y: newY }
                    : fig
            )
        );
    };

    return figures.map((fig) => {
        if (fig.type === FigureType.Rectangle) {
            return (
                <Rect
                    key={fig.id}
                    {...fig}
                    fill={selectedId === fig.id ? 'lightblue' : '#00D2FF'}
                    stroke="black"
                    strokeWidth={1}
                    shadowBlur={1}
                    draggable={selectedAction !== ActionType.Drag}
                    onDragMove={onDragMove}
                    onClick={(e) => {
                        if (selectedAction === ActionType.Drag) return;
                        e.cancelBubble = true;
                        setSelectedId(fig.id);
                    }}
                />
            );
        }
        // if (fig.type === FigureType.Pen) {
        //     return (
        //         <Line
        //             key={fig.id}
        //             {...fig}
        //             stroke="black"
        //             strokeWidth={1}
        //             lineCap="round"
        //             lineJoin="round"
        //             dash={[10, 5]}
        //             draggable={selectedAction !== ActionType.Drag}
        //             onClick={(e) => {
        //                 if (selectedAction === ActionType.Drag) return;
        //                 e.cancelBubble = true;
        //                 setSelectedId(fig.id);
        //             }}
        //         />
        //     );
        // }
        return null;
    });
};

