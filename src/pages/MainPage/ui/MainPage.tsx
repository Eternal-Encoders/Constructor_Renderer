import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { FigureType, Polygon, Rectangle } from "entities/Figure/Figure";
import { useCtrlWheelZoom } from "helpers/hooks/useCtrlWheelZoom";
import { useKeyboardShortcuts } from "helpers/hooks/useKeyboardShortcuts";
import { useMiddleMouseHold } from "helpers/hooks/useMiddleMouseHold";
import { useCallback, useState } from "react";
import { Actions } from "widgets/Actions";
import { Canvas } from "widgets/Canvas";
import { DropdownPanel } from "widgets/DropdownPanel";
import { InfoPanel } from "widgets/InfoPanel";
import { ObjectPalette } from "widgets/ObjectPalette";
import cls from "./MainPage.module.scss";

const MainPage = () => {

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<FigureType>(FigureType.None);
  const [selectedAction, setSelectedAction] = useState<ActionType>(ActionType.Cursor);
  const [scale, setScale] = useState<number>(1);

  const handleUndoMove = useCallback(() => {
    if (!selectedId) return;
    const isRectangle = rectangles.some((fig) => fig.id === selectedId);
    const isPolygon = polygons.some((fig) => fig.id === selectedId);

    if (!isRectangle && !isPolygon) return;

    if (isPolygon) {
      setPolygons((prev) =>
        prev.map((fig) => {
          if (fig.id !== selectedId || fig.history.length === 0) return fig;
          // Берём последнее состояние
          const lastState = fig.history[fig.history.length - 1];

          return {
            ...fig,
            x: lastState.x,
            y: lastState.y,
            history: fig.history.slice(0, -1), // Убираем последний элемент из истории
          };
        })
      );
    } else if (isRectangle) {
      setRectangles((prev) =>
        prev.map((fig) => {
          if (fig.id !== selectedId || fig.history.length === 0) return fig;
          // Берём последнее состояние
          const lastState = fig.history[fig.history.length - 1];

          return {
            ...fig,
            x: lastState.x,
            y: lastState.y,
            history: fig.history.slice(0, -1), // Убираем последний элемент из истории
          };
        })
      );
    }
  }, [selectedId, rectangles, setRectangles, polygons, setPolygons]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    if (polygons.some((fig) => fig.id === selectedId)) {
      setPolygons((prev) => prev.filter((fig) => fig.id !== selectedId));
    } else if (rectangles.some((fig) => fig.id === selectedId)) {
      setRectangles((prev) => prev.filter((fig) => fig.id !== selectedId));
    }
    setSelectedId(null);
  }, [polygons, rectangles, selectedId]);
  
  useKeyboardShortcuts({
    selectedId,
    handleDelete,
    setSelectedAction,
    setSelectedFigure,
  });
    
  useMiddleMouseHold((action, figure) => {
    setSelectedAction(action);
    setSelectedFigure(figure);
  });
    
  useCtrlWheelZoom({ scale, setScale });

  return (
    <div className={classNames(`content-page`)}>
      <ObjectPalette 
        setSelectedAction={setSelectedAction} 
        selectedAction={selectedAction} 
        setSelectedFigure={setSelectedFigure} 
        selectedFigure={selectedFigure}
      />
      <Actions 
        handleUndoMove={handleUndoMove} 
        handleDelete={handleDelete} 
        selectedId={selectedId} 
        setScale={setScale} 
        scale={scale}/>
      <div style={{display: 'flex'}}>
        <DropdownPanel className={classNames(cls.DropdownPanel)}/>
        <Canvas
          className={classNames(cls.Canvas)}
          scale={scale}
          setScale={setScale}
          setPolygons={setPolygons}
          polygons={polygons}
          setRectangles={setRectangles}
          rectangles={rectangles}
          selectedId={selectedId ?? undefined}
          selectedFigure={selectedFigure}
          selectedAction={selectedAction}
          setSelectedId={setSelectedId}
        />
        <InfoPanel className={classNames(cls.InfoPanel)}/>
      </div>
    </div>
  );
};

export default MainPage;