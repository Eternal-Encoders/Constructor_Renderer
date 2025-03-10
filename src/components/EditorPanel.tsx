import classNames from 'classnames';
import DottedLine from '../assets/DottedLine.svg?react';
import Rectangle from '../assets/Rectangle.svg?react';
import cls from "./EditorPanel.module.scss";

interface IEditorPanelProps {
    onAddFigure: (type: 'rectangle' | 'dottedLine') => void;
}

export const EditorPanel = ({ onAddFigure }: IEditorPanelProps) => {
    return (
        <div className={classNames(cls.EditorPanel)}>
            <ul className={classNames(cls.EditorPanel__list)}>
                <li className={classNames(cls.EditorPanel__item)} onClick={() => onAddFigure('rectangle')}>
                    <Rectangle />
                </li>
                <li className={classNames(cls.EditorPanel__item)} onClick={() => onAddFigure('dottedLine')}>
                    <DottedLine />
                </li>
            </ul>
        </div>
    );
};
