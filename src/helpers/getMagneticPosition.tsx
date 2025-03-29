import { Polygon, Rectangle } from "entities/Figure/Figure";
import { Layer } from "konva/lib/Layer";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Stage } from "konva/lib/Stage";
import { RefObject } from "react";

export const getMagneticPosition = (
    layerRef: RefObject<Layer | null>,
    node: Shape<ShapeConfig> | Stage,
    evt: DragEvent,
    fig: Rectangle | Polygon,
    scale: number,
    MAGNETIC_DISTANCE = 9
) => {
    if (!layerRef.current) return;

    let x = node.x();
    let y = node.y();

    const figNodeBox = layerRef.current.findOne(`#${fig.id}`);

    if (!figNodeBox) return;

    // Получаем координаты с учетом масштаба
    const rectNodeBox = figNodeBox.getClientRect({ skipStroke: true, skipShadow: true });
    const nodeBox = node.getClientRect({ skipStroke: true, skipShadow: true });

    let scaledMagneticDistance = MAGNETIC_DISTANCE / scale; // Масштабируем магнитное расстояние

    if (scaledMagneticDistance < 6) scaledMagneticDistance = 6;
    if (scaledMagneticDistance > 12) scaledMagneticDistance = 12;

    const figLeft = rectNodeBox.x;
    const figRight = rectNodeBox.x + rectNodeBox.width;
    const figTop = rectNodeBox.y;
    const figBottom = rectNodeBox.y + rectNodeBox.height;

    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBox.width;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBox.height;

    // 1) Приближаемся к левой стороне прямоугольника
    // 2) Приближаемся к правой стороне прямоугольника
    if (evt.movementX > 0 && Math.abs(figLeft - nodeRight) <= scaledMagneticDistance) {
        x -= (nodeRight - figLeft) / scale;
    } else if (evt.movementX < 0 && Math.abs(figRight - nodeLeft) <= scaledMagneticDistance) {
        x += (figRight - nodeLeft) / scale;
    }

    // 1) Приближаемся к верхней стороне прямоугольника
    // 2) Приближаемся к нижней стороне прямоугольника
    if (evt.movementY > 0 && Math.abs(figTop - nodeBottom) <= scaledMagneticDistance) {
        y -= (nodeBottom - figTop) / scale;
    } else if (evt.movementY < 0 && Math.abs(figBottom - nodeTop) <= scaledMagneticDistance) {
        y += (figBottom - nodeTop) / scale;
    }

    return { x, y };
};
