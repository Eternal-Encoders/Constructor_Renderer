import { ActionType } from "entities/Figure/Action";
import { FigureType } from "entities/Figure/Figure";
import { useEffect, useRef } from "react";


interface UseKeyboardShortcutsProps {
    selectedId: string | null;
    handleDelete: () => void;
    setSelectedAction: (action: ActionType) => void;
    setSelectedFigure: (figure: FigureType) => void;
}

export function useKeyboardShortcuts({
    selectedId,
    handleDelete,
    setSelectedAction,
    setSelectedFigure,
}: UseKeyboardShortcutsProps) {
    const keyDownHandlerRef = useRef<((event: KeyboardEvent) => void) | null>(null);

    useEffect(() => {
        keyDownHandlerRef.current = (event: KeyboardEvent) => {
            switch (event.code) {
                case "Delete":
                    if (selectedId) handleDelete();
                    break;
                case "KeyV":
                    setSelectedAction(ActionType.Cursor);
                    setSelectedFigure(FigureType.None);
                    break;
                case "KeyR":
                    setSelectedFigure(FigureType.Rectangle);
                    setSelectedAction(ActionType.None);
                    break;
                case "KeyP":
                    setSelectedFigure(FigureType.Polygon);
                    setSelectedAction(ActionType.None);
                    break;
                case "Space":
                    event.preventDefault();
                    setSelectedAction(ActionType.Drag);
                    setSelectedFigure(FigureType.None);
                    break;
                default:
                    break;
            }
        };
    }, [selectedId, handleDelete, setSelectedAction, setSelectedFigure]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (keyDownHandlerRef.current) {
                keyDownHandlerRef.current(event);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); // useEffect вызывается только один раз при монтировании

}