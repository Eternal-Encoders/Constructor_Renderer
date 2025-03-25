import { ActionType } from "entities/Figure/Action";
import { FigureType } from "entities/Figure/Figure";
import { useEffect } from "react";

type MouseHandler = (action: ActionType, figure: FigureType) => void;

export function useMiddleMouseHold(setState: MouseHandler) {
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (event.button === 1) { // Средняя кнопка мыши
                event.preventDefault();
                setState(ActionType.Drag, FigureType.None);
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, [setState]);
}