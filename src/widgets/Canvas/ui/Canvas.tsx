import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import {
  getLayoutBottomGap,
  getLayoutBreadCrumbsHeight,
  getLayoutHeaderHeight,
  getLayoutLeftGap,
  getLayoutLeftPanelWidth,
  getLayoutNavbarHeight,
  getLayoutRightGap,
  getLayoutRightPanelWidth,
  getLayoutTopGap
} from "entities/Layout";
import { createSquare } from "helpers/createSquare";
import { getRelativePointerPosition } from "helpers/getRelativePointerPosition";
import { getUniqueId } from "helpers/getUniqueId";
import { useBackgroundCanvas } from "helpers/hooks/useBackgroundCanvas";
import { useCancelTempFiguresFromKeyboard } from "helpers/hooks/useCancelTempFiguresFromKeyboard";
import { useMovingFigureFromKeyboard } from "helpers/hooks/useMovingFigureFromKeyboard";
import { useWindowSize } from "helpers/hooks/useWindowSize";
import { snapToAngle } from "helpers/snapToAngle";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layerRef = useRef<any>(null);
  // const backgroundRef = useRef(null);

  const [points, setPoints] = useState<number[]>([]);
  const [isClosed, setIsClosed] = useState(false);

  // Set CSS background when component mounts
  useBackgroundCanvas(stageRef);

  // Обработчик для передвижения фигуры по нажатиям на клавиши
  useMovingFigureFromKeyboard(selectedId, rectangles, polygons, setRectangles, setPolygons);

  // Отмена временных фигур при нажатии кнопки ESC
  useCancelTempFiguresFromKeyboard(selectedFigure, setTempRectangle, setRectStartPos, setTempLine, setPoints);

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
            draggable: true, history: [], type: FigureType.Polygon,
            id: `Многоугольник ${polygons.length + 1}`,
            name: `Многоугольник ${polygons.length + 1}`,
            createdAt: new Date(),  
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
      // Сделать логику квадрата
      if (selectedFigure === FigureType.Rectangle) {
        if (!startRectPos) return;
        setTempRectangle(createSquare(pos, startRectPos, rectangles, selectedFigure));
      } else if (selectedFigure === FigureType.Polygon) {
        if (!points.length) return;
        setTempLine(snapToAngle(points, pos.x, pos.y));
      }
    } else {
      if (selectedFigure === FigureType.Rectangle) {
        if (!startRectPos) return;
        setTempRectangle({
          id: `Прямоугольник ${rectangles.length + 1}`,
          name: `Прямоугольник ${rectangles.length + 1}`,
          type: selectedFigure,
          x: Math.min(startRectPos.x, pos.x),
          y: Math.min(startRectPos.y, pos.y),
          width: Math.abs(pos.x - startRectPos.x),
          height: Math.abs(pos.y - startRectPos.y),
          draggable: false,
          history: [],
          createdAt: new Date(),
        });
      } else if (selectedFigure === FigureType.Polygon) {
        if (!points.length) return;
        setTempLine({
          id: `temp-line-${getUniqueId()}`,
          name: `temp-line-${getUniqueId()}`,
          type: selectedFigure,
          draggable: false,
          history: [],
          x: pos.x,
          y: pos.y,
          isClosed,
          points: [...points, pos.x, pos.y],
          createdAt: new Date(),
        });
      }
    }
  };

  // Обработчик для отпускания кнопки мыши
  const onMouseUp = () => {
    if (selectedAction !== ActionType.None) return;

    if (selectedFigure === FigureType.Rectangle) {
      const finishedRectangle = tempRectangle;
      if (!finishedRectangle) return;
      // Проверяем минимальный размер перед добавлением
      if (finishedRectangle.width !== undefined && finishedRectangle.height !== undefined
                && (finishedRectangle.width < 5 || finishedRectangle.height < 5)) {
        setTempRectangle(null);
        setRectStartPos(null);
        return;
      }

      setRectangles((prev) => [...prev, {
        ...finishedRectangle,
        id: `${selectedFigure}-${Date.now()}`
      }]);
      setTempRectangle(null);
      setRectStartPos(null);
    } 
    else if (selectedFigure === FigureType.Polygon) {
      const finishedPolygon = tempLine
      if (!finishedPolygon) return;
      if (isClosed) {
        setPolygons((prev) => [...prev, { ...tempLine, id: `${selectedFigure}-${Date.now()}` }]);
        setTempLine(null);
        setPoints([]);
        setIsClosed(false);
      }
    }
  };

  const navbarHeight = useSelector(getLayoutNavbarHeight);
  const breadCrumbsHeight = useSelector(getLayoutBreadCrumbsHeight);
  const headerHeight = useSelector(getLayoutHeaderHeight);
  const leftPanelWidth = useSelector(getLayoutLeftPanelWidth);
  const rightPanelWidth = useSelector(getLayoutRightPanelWidth);
  const topGap = useSelector(getLayoutTopGap);
  const bottomGap = useSelector(getLayoutBottomGap);
  const leftGap = useSelector(getLayoutLeftGap);
  const rightGap = useSelector(getLayoutRightGap);

  return (
    <Stage
      className={
        classNames(
          cls.Stage, selectedAction === ActionType.Drag 
            ? cls['grab_active'] 
            : null, 
          [className]
        )
      }
      ref={stageRef}
      // onDragMove={handleDragMove}
      height={height - navbarHeight - topGap - bottomGap - breadCrumbsHeight - headerHeight}
      width={width - leftPanelWidth - rightPanelWidth - leftGap - rightGap}
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
