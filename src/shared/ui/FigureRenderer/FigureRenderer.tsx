import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType } from "entities/Figure/Figure";
import { Line, Rect } from "react-konva";

interface IFigureRendererProps {
    className?: string;
    selectedId?: string;
    figures: Figure[];
    selectedAction: ActionType;
    setSelectedId: (id: string | null) => void;
}

export const FigureRenderer = ({ className, figures, selectedId, selectedAction, setSelectedId }: IFigureRendererProps) => {
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
                    onClick={(e) => {
                        if (selectedAction === ActionType.Drag) return;
                        e.cancelBubble = true;
                        setSelectedId(fig.id);
                    }}
                />
            );
        }
        if (fig.type === FigureType.DottedLine) {
            return (
                <Line
                    key={fig.id}
                    {...fig}
                    stroke="black"
                    strokeWidth={1}
                    lineCap="round"
                    lineJoin="round"
                    dash={[10, 5]}
                    draggable={selectedAction !== ActionType.Drag}
                    onClick={(e) => {
                        if (selectedAction === ActionType.Drag) return;
                        e.cancelBubble = true;
                        setSelectedId(fig.id);
                    }}
                />
            );
        }
        return null;
    });
};
