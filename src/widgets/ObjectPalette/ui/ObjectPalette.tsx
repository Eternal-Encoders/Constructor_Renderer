import Cursor from 'assets/Cursor.svg?react';
import Hand from 'assets/Hand.svg?react';
import Pen from 'assets/Pen.svg?react';
import Rectangle from 'assets/Rectangle.svg?react';
import classNames from 'classnames';
import { ActionType } from 'entities/Figure/Action';
import { FigureType } from 'entities/Figure/Figure';
import cls from "./ObjectPalette.module.scss";

interface IObjectPaletteProps {
  selectedFigure: FigureType;
  selectedAction: ActionType;
  setSelectedFigure: (figure: FigureType) => void;
  setSelectedAction: (action: ActionType) => void;
}

export const ObjectPalette = ({ selectedFigure, setSelectedFigure, selectedAction, setSelectedAction }
: IObjectPaletteProps) => {

  return (
    <div className={classNames(cls.ObjectPalette)}>
      <ul role="list" className={classNames(cls.ObjectPalette__list)}>
        <li
          className={classNames(cls.ObjectPalette__item, selectedFigure === FigureType.Rectangle
            ? cls.ObjectPalette__item_active
            : undefined)}
          onClick={() => {
            setSelectedAction(ActionType.None);
            setSelectedFigure(FigureType.Rectangle);
          }}>
          <Rectangle />
        </li>
        <li
          className={classNames(cls.ObjectPalette__item, selectedFigure === FigureType.Polygon
            ? cls.ObjectPalette__item_active
            : undefined)}
          onClick={() => {
            setSelectedAction(ActionType.None);
            setSelectedFigure(FigureType.Polygon);
          }}>
          <Pen />
        </li>
        <li
          className={classNames(cls.ObjectPalette__item, selectedAction === ActionType.Cursor
            ? cls.ObjectPalette__item_active
            : undefined)}
          onClick={() => {
            setSelectedFigure(FigureType.None);
            setSelectedAction(ActionType.Cursor);
          }}>
          <Cursor />
        </li>
        <li
          className={classNames(cls.ObjectPalette__item, selectedAction === ActionType.Drag
            ? cls.ObjectPalette__item_active
            : undefined)}
          onClick={() => {
            setSelectedFigure(FigureType.None);
            setSelectedAction(ActionType.Drag);
          }}>
          <Hand />
        </li>
      </ul>
    </div>
  );
};
