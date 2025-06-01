import { FigureType, Rectangle } from "entities/Figure";

// Функция для создания квадрата
export const createSquare = (
  pos: { x: number; y: number; }, 
  startRectPos: { x: number; y: number; },
  rectangles: Rectangle[],
  selectedFigure: FigureType
) => {
  const dx = pos.x - startRectPos.x;
  const dy = pos.y - startRectPos.y;

  let width = Math.abs(dx);
  let height = Math.abs(dy);

  const size = Math.max(width, height); 
  width = size;
  height = size;

  return {
    id: `Прямоугольник ${rectangles.length + 1}`,
    name: `Прямоугольник ${rectangles.length + 1}`,
    type: selectedFigure as FigureType.Rectangle,
    x: dx >= 0 ? startRectPos.x : startRectPos.x - width,
    y: dy >= 0 ? startRectPos.y : startRectPos.y - height,
    width,
    height,
    draggable: false,
    history: [],
    createdAt: new Date(),
  };
}