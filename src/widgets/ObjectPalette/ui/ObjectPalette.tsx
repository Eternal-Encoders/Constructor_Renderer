import DottedLine from 'assets/DottedLine.svg?react';
import Hand from 'assets/Hand.svg?react';
import Rectangle from 'assets/Rectangle.svg?react';
import classNames from 'classnames';
import { FigureType } from 'entities/Figure/Figure';
import cls from "./ObjectPalette.module.scss";

interface IObjectPaletteProps {
    selectedFigure: FigureType | null;
    setSelectedFigure: (figure: FigureType | null) => void;
}

export const ObjectPalette = ({ selectedFigure, setSelectedFigure
    // onMouseDown, onMouseUp, onMouseLeave 
}: IObjectPaletteProps) => {

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
                    className={classNames(cls.ObjectPalette__item, selectedFigure === FigureType.Rectangle ? cls.ObjectPalette__item_active : undefined)}
                    onClick={() => setSelectedFigure(FigureType.Rectangle)}>
                    <Rectangle />
                </li>
                <li
                    onMouseDown={(event) => {
                        onMouseDown(event);
                        return setSelectedFigure(FigureType.DottedLine);
                    }}
                    className={classNames(cls.ObjectPalette__item, selectedFigure === FigureType.DottedLine ? cls.ObjectPalette__item_active : undefined)}
                    onClick={() => setSelectedFigure(FigureType.DottedLine)}>
                    <DottedLine />
                </li>
                <li
                    onMouseDown={(event) => {
                        onMouseDown(event);
                        return setSelectedFigure(null);
                    }}
                    className={classNames(cls.ObjectPalette__item, selectedFigure === null ? cls.ObjectPalette__item_active : undefined)}
                    onClick={() => setSelectedFigure(null)}>
                    <Hand />
                </li>
            </ul>
        </div>
    );
};
