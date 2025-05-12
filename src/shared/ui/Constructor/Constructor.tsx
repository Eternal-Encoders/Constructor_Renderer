import classNames from "classnames";
import { FigureType, Polygon, Rectangle } from "entities/Figure";
import { ActionType } from "entities/Figure/Action";
import { useCtrlWheelZoom } from "helpers/hooks/useCtrlWheelZoom";
import { useKeyboardShortcuts } from "helpers/hooks/useKeyboardShortcuts";
import { useMiddleMouseHold } from "helpers/hooks/useMiddleMouseHold";
import { useCallback, useState } from "react";
import { Canvas } from "widgets/Canvas";
import { DropdownPanel } from "widgets/DropdownPanel";
import { InfoPanel } from "widgets/SectionPanel";
import { Actions } from "../Actions/ui/Actions";
import { SelectorItems } from "../SelectorItems/ui/SelectorItems";
import cls from "./Constructor.module.scss";

interface IConstructorProps {
  className?: string;
}

export const Constructor = ({ className }: IConstructorProps) => {
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

  const handleRedoMove = useCallback(() => {
    console.log('redo');
  }, []);
  
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
    <div className={classNames(cls.Constructor, {}, [className])}>
      <div className={classNames(`content-page`, cls.ConstructorCategory)}>
        <div style={{display: 'flex'}}>
          <DropdownPanel className={classNames(cls.DropdownPanel)}/>
          <Canvas
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
          <Actions 
            className={classNames(cls.Actions)}
            handleUndoMove={handleUndoMove} 
            handleRedoMove={handleRedoMove}
            selectedId={selectedId} 
            setScale={setScale} 
            scale={scale}/>
          <InfoPanel className={classNames(cls.InfoPanel)}/>
        </div>
        <SelectorItems
          className={classNames(cls.SelectorItems)}
          selectedFigure={selectedFigure}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          setSelectedFigure={setSelectedFigure}
        />
      </div>
    </div>
  );
};
