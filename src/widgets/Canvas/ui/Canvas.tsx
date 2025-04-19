import classNames from "classnames";
import { getBackgroundHEXCode } from "entities/Background/model/selectors/getBackgroundHEXCode/getBackgroundHEXCode";
import { getBackgroundOpacity } from "entities/Background/model/selectors/getBackgroundOpacity/getBackgroundOpacity";
import { ActionType } from "entities/Figure/Action";
import { FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import { getRelativePointerPosition } from "helpers/getRelativePointerPosition";
import { useWindowSize } from "helpers/hooks/useWindowSize";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { useSelector } from "react-redux";
import { FigureRenderer } from "shared/ui/FigureRenderer/FigureRenderer";
import cls from './Canvas.module.scss';

interface ICanvasProps {
  className?: string;
  selectedId?: string;
  selectedFigure: FigureType;
  polygons: Polygon[];
  setPolygons: (polygons: Polygon[] | ((prev: Polygon[]) => Polygon[])) => void;
  rectangles: Rectangle[];
  setRectangles: (rectangles: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])) => void;
  scale: number;
  setScale: (scale: number) => void;
  selectedAction: ActionType;
  setSelectedId: (id: string | null) => void;
}

export const Canvas = (props: ICanvasProps) => {
  const { 
    className, 
    polygons, 
    setPolygons, 
    rectangles, 
    selectedId, 
    selectedFigure,
    setSelectedId, 
    setRectangles, 
    scale, 
    selectedAction 
  } = props;

  const [startRectPos, setRectStartPos] = useState<{ x: number, y: number; } | null>(null);
  const [tempRectangle, setTempRectangle] = useState<Rectangle | null>(null);
  const [tempLine, setTempLine] = useState<Polygon | null>(null);
  const [width, height] = useWindowSize();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stageRef = useRef<any>(null);
  const layerRef = useRef(null);
  // const backgroundRef = useRef(null);

  const [points, setPoints] = useState<number[]>([]);
  const [isClosed, setIsClosed] = useState(false);

  const bgcHEXCode = useSelector(getBackgroundHEXCode);
  const bgOpacity = useSelector(getBackgroundOpacity);

  // Set CSS background when component mounts
  useEffect(() => {
    if (stageRef.current) {
      // Apply CSS background to stage container
      const container = stageRef.current.container();
      container.style.backgroundColor = bgcHEXCode;
      container.style.opacity = bgOpacity;
    }
  }, [bgcHEXCode, bgOpacity]);

  // Обработчик для передвижения фигуры по нажатиям на клавиши
  useEffect(() => {
    if (!selectedId) return;

    const movement: Record<number, { x: number; y: number; }> = {
      37: { x: -1, y: 0 }, // Влево
      38: { x: 0, y: -1 }, // Вверх
      39: { x: 1, y: 0 }, // Вправо
      40: { x: 0, y: 1 }, // Вниз
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.keyCode in movement)) return;
      event.preventDefault();

      const { x, y } = movement[event.keyCode];

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

  // Отмена временных фигур при нажатии кнопки ESC
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
  }, [selectedFigure]);

  // Обработчик для нажатия кнопки мыши
  const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    // If click on white stage then selectedId = null
    if (selectedAction === ActionType.Cursor) {
      if (selectedId && event.target === stage) { setSelectedId(null); return; };
    }
    if (selectedAction !== ActionType.None) return;
    if (!stage) return;

    const pos = getRelativePointerPosition(stage, scale);
    if (!pos) return;

    // Set start pos on what you clicked
    if (selectedFigure === FigureType.Rectangle)
      setRectStartPos(pos);
    else if (selectedFigure === FigureType.Polygon) {
      // Если есть как минимум две точки
      if (points.length >= 4) {
        const [firstX, firstY] = points;
        const distance = Math.hypot(pos.x - firstX, pos.y - firstY);
        // Если первая точка близко находится с последней, тогда закрываем
        if (distance < 3 / scale) {
          // const closedPoints = [...points, points[points.length - 2], points[points.length - 1]];
          setPolygons([...polygons, {
            points, isClosed: true,
            id: `${selectedFigure}-${Date.now()}`,
            draggable: true, history: [], type: FigureType.Polygon
          }]);
          setTempLine(null);
          setPoints([]);
          return;
        }
      }

      const snappedPoint = event.evt.shiftKey ? snapToAngle(points, pos.x, pos.y).points.slice(-2) : [pos.x, pos.y];
      setPoints([...points, ...snappedPoint]);
    }
  };

  // Обработчик для доведения линии
  const snapToAngle = (points: number[], x: number, y: number) => {
    const [startX, startY] = [points[points.length - 2], points[points.length - 1]];
    const dx = x - startX;
    const dy = y - startY;
    const angle = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4);
    const distance = Math.sqrt(dx * dx + dy * dy);

    const snappedX = startX + Math.cos(angle) * distance;
    const snappedY = startY + Math.sin(angle) * distance;

    return {
      id: "temp-line",
      type: FigureType.Polygon as FigureType.Polygon,
      draggable: false,
      history: [],
      x: snappedX,
      y: snappedY,
      isClosed: false,
      points: [...points, snappedX, snappedY],
    };
  };

  // Обработчик для движения мыши
  const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    // Если выбранное действие - это ни ничего, то выходим 
    if (selectedAction !== ActionType.None) return;

    const stage = event.target.getStage();
    if (!stage) return;

    const pos = getRelativePointerPosition(stage, scale);
    if (!pos) return;

    // Проверяем, зажат ли Shift
    if (event.evt.shiftKey) {
      if (selectedFigure === FigureType.Rectangle) {
        if (!startRectPos) return;
        setTempRectangle({
          id: "temp-rectangle",
          type: selectedFigure,
          x: Math.min(startRectPos.x, pos.x),
          y: Math.min(startRectPos.y, pos.y),
          width: Math.abs(pos.x - startRectPos.x),
          height: Math.abs(pos.y - startRectPos.y),
          draggable: false,
          history: [],
        });
      } else if (selectedFigure === FigureType.Polygon) {
        if (!points.length) return;
        setTempLine(snapToAngle(points, pos.x, pos.y));
      }
    } else {
      if (selectedFigure === FigureType.Rectangle) {
        if (!startRectPos) return;
        setTempRectangle({
          id: "temp-rectangle",
          type: selectedFigure,
          x: Math.min(startRectPos.x, pos.x),
          y: Math.min(startRectPos.y, pos.y),
          width: Math.abs(pos.x - startRectPos.x),
          height: Math.abs(pos.y - startRectPos.y),
          draggable: false,
          history: [],
        });
      } else if (selectedFigure === FigureType.Polygon) {
        if (!points.length) return;
        setTempLine({
          id: "temp-line",
          type: selectedFigure,
          draggable: false,
          history: [],
          x: pos.x,
          y: pos.y,
          isClosed: isClosed,
          points: [...points, pos.x, pos.y],
        });
      }
    }
  };

  // Обработчик для отпускания кнопки мыши
  const onMouseUp = () => {
    if (selectedAction !== ActionType.None) return;

    if (selectedFigure === FigureType.Rectangle) {
      if (!tempRectangle) return;
      // Проверяем минимальный размер перед добавлением
      if (tempRectangle.width !== undefined && tempRectangle.height !== undefined
                && (tempRectangle.width < 5 || tempRectangle.height < 5)) {
        setTempRectangle(null);
        setRectStartPos(null);
        return;
      }

      setRectangles((prev) => [...prev, {
        ...tempRectangle,
        id: `${selectedFigure}-${Date.now()}`
      }]);
      setTempRectangle(null);
      setRectStartPos(null);
    } else if (selectedFigure === FigureType.Polygon) {
      if (!tempLine) return;
      if (isClosed) {
        setPolygons((prev) => [...prev, { ...tempLine, id: `${selectedFigure}-${Date.now()}` }]);
        setTempLine(null);
        setPoints([]);
        setIsClosed(false);
      }

    }

  };

  const navbarHeight = 84;
  const topGapHeight = 12;
  const bottomGapHeight = 12;
  const leftPanel = 240;
  const rightPanel = 240;

  return (
    <Stage
      className={classNames(cls.Stage, selectedAction === ActionType.Drag ? cls['grab_active'] : null, [className])}
      ref={stageRef}
      // onDragMove={handleDragMove}
      height={height - navbarHeight - topGapHeight - bottomGapHeight}
      width={width - leftPanel - rightPanel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      scale={{ x: scale, y: scale }}
      draggable={selectedAction === ActionType.Drag}
    >
      <Layer ref={layerRef}>
        <FigureRenderer
          layerRef={layerRef}
          figure={{
            rectangles: [...rectangles,
              ...(tempRectangle ? [tempRectangle] : [])],
            polygons: [...polygons, ...(tempLine ? [tempLine] : [])]
          }}
          selectedId={selectedId}
          selectedAction={selectedAction}
          setSelectedId={setSelectedId}
          setRectangles={setRectangles}
          setPolygons={setPolygons}
          scale={scale}
        />
      </Layer>
    </Stage>
  );
};
