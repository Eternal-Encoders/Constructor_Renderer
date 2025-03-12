import DottedLine from 'assets/DottedLine.svg?react';
import Rectangle from 'assets/Rectangle.svg?react';
import classNames from 'classnames';
import cls from "./ObjectPalette.module.scss";

interface IObjectPaletteProps {
    onAddFigure: (type: 'rectangle' | 'dottedLine') => void;
}

export const ObjectPalette = ({ onAddFigure }: IObjectPaletteProps) => {
    return (
        <div className={classNames(cls.ObjectPalette)}>
            <ul role="list" className={classNames(cls.ObjectPalette__list)}>
                <li className={classNames(cls.ObjectPalette__item)} onClick={() => onAddFigure('rectangle')}>
                    <Rectangle />
                </li>
                <li className={classNames(cls.ObjectPalette__item)} onClick={() => onAddFigure('dottedLine')}>
                    <DottedLine />
                </li>
            </ul>
        </div>
    );
};
