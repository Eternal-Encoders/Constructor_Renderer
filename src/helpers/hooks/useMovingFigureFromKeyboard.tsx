import { Polygon, Rectangle } from "entities/Figure";
import { useEffect } from "react";

export const useMovingFigureFromKeyboard = (
  selectedId: string | undefined, 
  rectangles: Rectangle[], 
  polygons: Polygon[], 
  setRectangles: React.Dispatch<React.SetStateAction<Rectangle[]>>, 
  setPolygons: React.Dispatch<React.SetStateAction<Polygon[]>>
) => {
  useEffect(() => {
    if (!selectedId) return;

    const movement: Record<string, { x: number; y: number; }> = {
      ArrowLeft: { x: -1, y: 0 }, // Влево
      ArrowUp: { x: 0, y: -1 }, // Вверх
      ArrowRight: { x: 1, y: 0 }, // Вправо
      ArrowDown: { x: 0, y: 1 }, // Вниз
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.key in movement)) return;
      event.preventDefault();

      const { x, y } = movement[event.key];

      if (rectangles.some((fig) => fig.id === selectedId)) {
        setRectangles((prev) =>
          prev.map((fig) =>
            fig.id === selectedId
              ? {
                ...fig,
                history: [...fig.history, { x: fig.x, y: fig.y }],
                x: fig.x + x,
                y: fig.y + y,
              }
              : fig
          )
        );
      } else if (polygons.some((fig) => fig.id === selectedId)) {
        setPolygons((prev) =>
          prev.map((fig) => {
            if (fig.id === selectedId) {
              if (fig.x && fig.y) {
                return {
                  ...fig,
                  history: [...fig.history, { points: [...fig.points], x: fig.x, y: fig.y }],
                  x: fig.x + x,
                  y: fig.y + y,
                };
              }
            }
            return fig;
          }
          )
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, rectangles, polygons, setRectangles, setPolygons]);
}