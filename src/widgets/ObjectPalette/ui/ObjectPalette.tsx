import Cursor from 'assets/Cursor.svg?react';
import DottedLine from 'assets/DottedLine.svg?react';
import Hand from 'assets/Hand.svg?react';
import Rectangle from 'assets/Rectangle.svg?react';
import classNames from 'classnames';
import { ActionType } from 'entities/Figure/Action';
import { FigureType } from 'entities/Figure/Figure';
import cls from "./ObjectPalette.module.scss";

interface IObjectPaletteProps {
    selectedFigure: FigureType | null;
    selectedAction: ActionType;
    setSelectedFigure: (figure: FigureType | null) => void;
    setSelectedAction: (action: ActionType) => void;
}

export const ObjectPalette = ({ selectedFigure, setSelectedFigure, selectedAction, setSelectedAction }
    : IObjectPaletteProps) => {

    const onMouseDown = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.preventDefault();
        console.log(event);
    };

    return (
        <div className={classNames(cls.ObjectPalette)}>
            <ul role="list" className={classNames(cls.ObjectPalette__list)}>
                <li
                    onMouseDown={(event) => {
                        onMouseDown(event);
                        return setSelectedFigure(FigureType.Rectangle);
                    }}
                    className={classNames(cls.ObjectPalette__item, selectedFigure === FigureType.Rectangle
                        ? cls.ObjectPalette__item_active
                        : undefined)}
                    onClick={() => setSelectedFigure(FigureType.Rectangle)}>
                    <Rectangle />
                </li>
                <li
                    onMouseDown={(event) => {
                        onMouseDown(event);
                        return setSelectedFigure(FigureType.DottedLine);
                    }}
                    className={classNames(cls.ObjectPalette__item, selectedFigure === FigureType.DottedLine
                        ? cls.ObjectPalette__item_active
                        : undefined)}
                    onClick={() => setSelectedFigure(FigureType.DottedLine)}>
                    <DottedLine />
                </li>
                <li
                    onMouseDown={(event) => {
                        onMouseDown(event);
                        return setSelectedAction(ActionType.Cursor);
                    }}
                    className={classNames(cls.ObjectPalette__item, selectedAction === ActionType.Cursor
                        ? cls.ObjectPalette__item_active
                        : undefined)}
                    onClick={() => setSelectedAction(ActionType.Cursor)}>
                    <Cursor />
                </li>
                <li
                    onMouseDown={(event) => {
                        onMouseDown(event);
                        return setSelectedAction(ActionType.Drag);
                    }}
                    className={classNames(cls.ObjectPalette__item, selectedAction === ActionType.Drag
                        ? cls.ObjectPalette__item_active
                        : undefined)}
                    onClick={() => setSelectedAction(ActionType.Drag)}>
                    <Hand />
                </li>
            </ul>
        </div>
    );
};
