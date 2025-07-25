import { ActionType } from "entities/Figure/Action";
import { Figure, FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import { getImageOpacity } from "entities/Image/model/selectors/getImageOpacity/getImageOpacity";
import { getImageSrc } from "entities/Image/model/selectors/getImageSrc/getImageSrc";
import { getImageVisibility } from "entities/Image/model/selectors/getImageVisibility/getImageVisibility";
import { getMagneticPosition } from "helpers/getMagneticPosition";
import { useLoadImage } from "helpers/hooks/useLoadImage";
import { useTransformer } from "helpers/hooks/useTransformer";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Image as KonvaImage, Line, Rect, Transformer } from "react-konva";
import { useSelector } from "react-redux";

interface IFigureRendererProps {
  className?: string;
  selectedId?: string;
  figure: Figure;
  setRectangles: (rectangles: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])) => void;
  setPolygons: (rectangles: Polygon[] | ((prev: Polygon[]) => Polygon[])) => void;
  selectedAction: ActionType;
  setSelectedId: (id: string | null) => void;
  layerRef: React.RefObject<Konva.Layer | null>;
  scale: number;
}

export const FigureRenderer = ({  figure, selectedId, selectedAction, 
  setSelectedId, setRectangles, setPolygons, layerRef, scale } : IFigureRendererProps) => {

  const [idHovered, setIdHovered] = useState<string | null>(null);

  const imageVisibility = useSelector(getImageVisibility);
  const imageOpacity = useSelector(getImageOpacity);
  const imageSrc = useSelector(getImageSrc);

  const { imageObj, imagePosition } = useLoadImage(imageSrc, layerRef);

  const {transformerRef, selectedNodeRef} = useTransformer(selectedId);

  // Трансформация фигуры: Изменение размера, поворота фигуры
  const onTransformEnd = (e: KonvaEventObject<Event>) => {
    const node = e.target;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth = node.width() * scaleX;
    const newHeight = node.height() * scaleY;

    // Проверка на прямоугольник, т.к. у него type - rectangle, а у мног-ка undefined
    if (node.attrs.type === FigureType.Rectangle) {
      setRectangles((prev) =>
        prev.map((fig) =>
          fig.id === node.id()
            ? {
              ...fig,
              x: node.x(),
              y: node.y(),
              width: newWidth,
              height: newHeight,
            }
            : fig
        )
      );
    } else if (node.attrs.type === FigureType.Polygon) {
      setPolygons((prev) =>
        prev.map((fig: Polygon) =>
          fig.id === node.id()
            ? {
              id: fig.id,
              name: fig.name,
              points: fig.points.map((p, i) =>
                i % 2 === 0 ? p * scaleX : p * scaleY // Масштабируем x и y координаты
              ),
              x: node.x(),
              y: node.y(),
              history: fig.history,
              isClosed: fig.isClosed,
              draggable: fig.draggable,
              type: fig.type,
              createdAt: fig.createdAt
            }
            : fig
        )
      );
    }

    // Сбрасываем scale после обновления стейта
    node.scaleX(1);
    node.scaleY(1);
  };

  // При перетаскивании фигуры сохранять в истории начальные координаты
  const onDragStart = (e: KonvaEventObject<DragEvent>) => {
    const node = e.target;

    if (node.attrs.type === FigureType.Rectangle) {
      setRectangles((prev) =>
        prev.map((fig: Rectangle) =>
          fig.id === node.id()
            ? { ...fig, history: [...fig.history, { x: fig.x, y: fig.y }] }
            : fig
        )
      );
    } else if (node.attrs.type === FigureType.Polygon) {
      setPolygons((prev) =>
        prev.map((fig: Polygon) => {
          if (fig.id !== node.id()) {
            return fig;
          }
          if (!(fig.x && fig.y)) {
            return { ...fig, history: [...fig.history, { x: 0, y: 0 }] };
          }
          return { ...fig, history: [...fig.history, { x: fig.x!, y: fig.y! }] };
        })
      );
    }
  };

  // Перемещение фигуры с логикой магнита
  const onDragMove = (e: KonvaEventObject<DragEvent>) => {
    if (selectedAction !== ActionType.Cursor) return;

    const allFigures = [...figure.rectangles, ...figure.polygons];
    const node = e.target;

    const baseCoordinates = { x: node.x(), y: node.y() };

    const arrayOfNewCoordinates: { x: number; y: number; }[] = [];

    allFigures.forEach(fig => {
      if (fig.id === node.id()) return;
      const tempCoordinates = getMagneticPosition(layerRef, node, e.evt, fig, scale);
      if (tempCoordinates) {
        arrayOfNewCoordinates.push(tempCoordinates);
      }
    });

    const [newCoordinates] = arrayOfNewCoordinates.filter(
      (coord) => coord.x !== baseCoordinates.x || coord.y !== baseCoordinates.y);

    if (!newCoordinates) {
      // Применяем базовые координаты
      node.position({ x: baseCoordinates.x, y: baseCoordinates.y });
    } else {
      // Применяем скорректированные координаты
      node.position({ x: newCoordinates.x, y: newCoordinates.y });
    }

    if (node.attrs.type === FigureType.Rectangle) {
      setRectangles((prev) =>
        prev.map((fig) =>
          fig.id === node.id()
            ? {
              ...fig,
              ...newCoordinates ?? { ...baseCoordinates },
            }
            : fig
        )
      );
    }
    else if (node.attrs.type === FigureType.Polygon) {
      setPolygons((prev) =>
        prev.map((fig) =>
          fig.id === node.id()
            ? {
              ...fig,
              points: fig.points,
              ...newCoordinates ?? { ...baseCoordinates },
            }
            : fig
        )
      );
    }
  };

  console.log(layerRef);
  console.log(figure);

  return (
    <>
      {imageObj && (
        <>
          <KonvaImage
            image={imageObj}
            visible={imageVisibility}
            opacity={imageOpacity}
            onClick={(e) => {
              if (selectedAction !== ActionType.Cursor) return;
              e.cancelBubble = true; 
              // setSelectedId(fig.id);
              selectedNodeRef.current = e.target;
            }}
            ref={(node) => {
              selectedNodeRef.current = node;
            }}
            x={imagePosition?.x}
            y={imagePosition?.y}
            draggable={selectedAction === ActionType.Cursor}
          />
        </>
      )}
      {figure.rectangles.map((fig) => (
        <Rect
          onMouseEnter={(evt) => setIdHovered(evt.target.id())}
          onMouseLeave={() => setIdHovered(null)}
          key={fig.id}
          {...fig}
          id={fig.id}
          type={fig.type}
          fill={(selectedId === fig.id) ? "lightblue" : "#00D2FF"}
          stroke={idHovered === fig.id ? "blue" : "black"}
          strokeWidth={idHovered === fig.id ? 2 : 1}
          shadowBlur={1}
          draggable={selectedAction === ActionType.Cursor}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onTransformEnd={onTransformEnd}
          onClick={(e) => {
            if (selectedAction !== ActionType.Cursor) return;
            e.cancelBubble = true;
            setSelectedId(fig.id);
            selectedNodeRef.current = e.target;
          }}
          ref={(node) => {
            if (selectedId === fig.id) {
              selectedNodeRef.current = node;
            }
          }}
        />
      ))}
      {figure.polygons.map((pol) => {
        return (
          <Line
            onMouseEnter={(evt) => setIdHovered(evt.target.id())}
            onMouseLeave={() => setIdHovered(null)}
            key={pol.id}
            name={pol.name}
            {...pol.isClosed ? { ...pol } : null}
            id={pol.id}
            type={pol.type}
            points={pol.points}
            stroke={idHovered === pol.id ? "blue" : "black"}
            strokeWidth={idHovered === pol.id ? 2 : 1}
            shadowBlur={1}
            closed={pol.isClosed}
            fill={"transparent"}
            draggable={selectedAction === ActionType.Cursor}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onTransformEnd={onTransformEnd}
            onClick={(e) => {
              if (selectedAction !== ActionType.Cursor) return;
              e.cancelBubble = true;
              setSelectedId(pol.id);
              selectedNodeRef.current = e.target;
            }}
            ref={(node) => {
              if (selectedId === pol.id) {
                selectedNodeRef.current = node;
              }
            }}
          />
        );
      })}
      <Transformer
        ref={transformerRef}
        boundBoxFunc={(oldBox, newBox) => {
          // Limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </>
  );
};