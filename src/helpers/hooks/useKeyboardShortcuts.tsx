import { ActionType } from "entities/Figure/Action";
import { FigureType } from "entities/Figure/Figure";
import { useEffect } from "react";

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
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
                    event.preventDefault(); // Предотвращает прокрутку страницы
                    setSelectedAction(ActionType.Drag);
                    setSelectedFigure(FigureType.None);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedId, handleDelete, setSelectedAction, setSelectedFigure]);
}
