import classNames from "classnames";
import cls from "./Select.module.scss";

interface ISelectProps {
    className?: string;
    scale: number | null;
    setScale: (props: number) => void;
}

export const Select = ({ className, setScale, scale }: ISelectProps) => {
    if (scale === null) scale = 1;

    return (
        <div className={classNames(cls.Select, {}, [className])}>
            <label className={classNames(cls.Select__label)}>
                Масштаб:
                <select value={scale.toString()} name="selectedScale" id="selectedScale" onChange={(e) => setScale(parseFloat(e.target.value))}>
                    <option value="0.1">0.1</option>
                    <option value="0.5">0.5</option>
                    <option value="0.8">0.8</option>
                    <option value="1">1 (Обычный)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value={scale.toString()}>Польз: {scale.toFixed(1).toString()}</option>
                </select>
            </label>
        </div>
    );
};
