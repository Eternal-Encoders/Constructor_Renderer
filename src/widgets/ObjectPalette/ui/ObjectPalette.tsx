import Cursor from 'assets/Cursor.svg?react';
import Hand from 'assets/Hand.svg?react';
import Pen from 'assets/Pen.svg?react';
import Rectangle from 'assets/Rectangle.svg?react';
import classNames from 'classnames';
import { ActionType } from 'entities/Figure/Action';
import { FigureType } from 'entities/Figure/Figure';
import cls from "./ObjectPalette.module.scss";

interface IObjectPaletteProps {
  className?: string
  selectedFigure: FigureType;
  selectedAction: ActionType;
  setSelectedFigure: (figure: FigureType) => void;
  setSelectedAction: (action: ActionType) => void;
}

export const ObjectPalette = ({ className, selectedFigure, setSelectedFigure, selectedAction, setSelectedAction }
: IObjectPaletteProps) => {

  const setActive = (actionType: ActionType, figureType: FigureType) => {
    setSelectedAction(actionType);
    setSelectedFigure(figureType);
  }

  const classNamesFigure = (figureType: FigureType) => 
    classNames(cls.ObjectPalette__item, selectedFigure === figureType
    && cls.ObjectPalette__item_active);

  const classNamesAction = (actionType: ActionType) => 
    classNames(cls.ObjectPalette__item, selectedAction === actionType
      && cls.ObjectPalette__item_active);

  return (
    <div className={classNames(cls.ObjectPalette, className)}>
      <ul role="list" className={classNames(cls.ObjectPalette__list)}>
        <li
          className={classNamesAction(ActionType.Cursor)}
          onClick={() => setActive(ActionType.Cursor, FigureType.None)}>
          <Cursor />
        </li>
        <li
          className={classNamesFigure(FigureType.Polygon)}
          onClick={() => setActive(ActionType.None, FigureType.Polygon)}>
          <Pen />
        </li>
        <li
          className={classNamesFigure(FigureType.Rectangle)}
          onClick={() => setActive(ActionType.None, FigureType.Rectangle)}>
          <Rectangle />
        </li>
        <li
          className={classNamesAction(ActionType.Drag)}
          onClick={() => setActive(ActionType.Drag, FigureType.None)}>
          <Hand />
        </li>
      </ul>
    </div>
  );
};
