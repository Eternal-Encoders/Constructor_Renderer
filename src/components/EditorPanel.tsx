import Door from '../assets/Door.svg?react';
import DottedLine from '../assets/DottedLine.svg?react';
import Flower from '../assets/Flower.svg?react';
import Rectangle from '../assets/Rectangle.svg?react';
import TripleLine from '../assets/TripleLine.svg?react';
import cls from "./EditorPanel.module.scss";

interface IEditorPanelProps {
    className?: string;
}

export const EditorPanel = ({ className }: IEditorPanelProps) => {
    return (
        <div className={cls.EditorPanel}>
            <ul className={cls.EditorPanel__list}>
                <li className={cls.EditorPanel__item}><Rectangle /></li>
                <li className={cls.EditorPanel__item}><DottedLine /></li>
                <li className={cls.EditorPanel__item}><TripleLine /></li>
                <li className={cls.EditorPanel__item}><Door /></li>
                <li className={cls.EditorPanel__item}><Flower /></li>
            </ul>
        </div>
    );
};
