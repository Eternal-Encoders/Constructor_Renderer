import Cursor from 'assets/Cursor.svg?react';
import Hand from 'assets/Hand.svg?react';
import Pen from 'assets/Pen.svg?react';
import Rectangle from 'assets/Rectangle.svg?react';
import classNames from "classnames";
import { ActionType } from "entities/Figure/Action";
import { FigureType } from "entities/Figure/Figure";
import { SelectorItem } from "../../../shared/ui/SelectorItem/SelectorItem";
import cls from "./SelectorItems.module.scss";

interface ISelectorItemsProps {
  className?: string;
  selectedFigure: FigureType;
  selectedAction: ActionType;
  setSelectedFigure: (figure: FigureType) => void;
  setSelectedAction: (action: ActionType) => void;
}

export const SelectorItems = (props: ISelectorItemsProps) => {
  
  const { 
    className,
    selectedFigure, 
    selectedAction,
    setSelectedFigure, 
    setSelectedAction,
  } = props;

  const setActive = (actionType: ActionType, figureType: FigureType) => {
    setSelectedAction(actionType);
    setSelectedFigure(figureType);
  }

  const classNamesFigure = (figureType: FigureType) => 
    classNames(cls.SelectorItems__item, {[cls.SelectorItems__item_active]: selectedFigure === figureType});

  const classNamesAction = (actionType: ActionType) => 
    classNames(cls.SelectorItems__item, {[cls.SelectorItems__item_active]: selectedAction === actionType});

  return (
    <div className={classNames(cls.SelectorItems, className)}>
      <SelectorItem
        className={classNamesAction(ActionType.Cursor)}
        onClick={() => setActive(ActionType.Cursor, FigureType.None)}
        size='medium'
        iconTop={<Cursor />}
      >
        Курсор
      </SelectorItem>
      <SelectorItem
        className={classNamesFigure(FigureType.Polygon)}
        onClick={() => setActive(ActionType.None, FigureType.Polygon)}
        size='medium'
        iconTop={<Pen />}
      >
        Фигура
      </SelectorItem>
      <SelectorItem
        className={classNamesFigure(FigureType.Rectangle)}
        onClick={() => setActive(ActionType.None, FigureType.Rectangle)}
        size='medium'
        iconTop={<Rectangle />}
      >
        Прямоуг.
      </SelectorItem>
      <SelectorItem
        className={classNamesAction(ActionType.Drag)}
        onClick={() => setActive(ActionType.Drag, FigureType.None)}
        size='medium'
        iconTop={<Hand />}
      >
        Перемещ.
      </SelectorItem>
    </div>
  );
};
