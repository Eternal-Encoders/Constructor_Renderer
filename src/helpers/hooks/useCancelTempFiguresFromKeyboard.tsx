import { FigureType, Polygon, Rectangle } from "entities/Figure";
import { useEffect } from "react";

export const useCancelTempFiguresFromKeyboard = (
  selectedFigure: FigureType, 
  setTempRectangle: (rect: Rectangle | null) => void,
  setRectStartPos: (pos: { x: number, y: number } | null) => void,
  setTempLine: (pol: Polygon | null) => void, 
  setPoints: (points: number[]) => void,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedFigure === FigureType.Rectangle) {
          setTempRectangle(null);
          setRectStartPos(null);
        }
        // TODO: Реализовать отдельные линии 
        else if (selectedFigure === FigureType.Polygon) {
          setTempLine(null);
          setPoints([]);
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFigure, setPoints, setRectStartPos, setTempLine, setTempRectangle]);
}