import { FigureType } from "entities/Figure";
import { getUniqueId } from "./getUniqueId";

// Обработчик для доведения линии
export const snapToAngle = (points: number[], x: number, y: number) => {
  const [startX, startY] = [points[points.length - 2], points[points.length - 1]];
  const dx = x - startX;
  const dy = y - startY;
  const angle = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4);
  const distance = Math.sqrt(dx * dx + dy * dy);

  const snappedX = startX + Math.cos(angle) * distance;
  const snappedY = startY + Math.sin(angle) * distance;

  return {
    id: `temp-line-${getUniqueId()}`,
    name:`temp-line-${getUniqueId()}`,
    type: FigureType.Polygon as FigureType.Polygon,
    draggable: false,
    history: [],
    x: snappedX,
    y: snappedY,
    isClosed: false,
    points: [...points, snappedX, snappedY],
    createdAt: new Date(),
  };
};