import classNames from "classnames";
import cls from "./Select.module.scss";

interface ISelectProps {
  className?: string;
  scale: number;
  setScale: (props: number) => void;
}

export const Select = ({ className, setScale, scale }: ISelectProps) => {
  const predefinedScales = [0.1, 0.5, 0.8, 1, 2, 3];
  const uniqueScales = predefinedScales.includes(scale) ? predefinedScales : [...predefinedScales, scale];

  return (
    <div className={classNames(cls.Select, {}, [className])}>
      <label className={classNames(cls.Select__label)}>
        Масштаб:
        <select
          value={scale.toString()}
          name="selectedScale"
          id="selectedScale"
          onChange={(e) => setScale(parseFloat(e.target.value))}
        >
          {uniqueScales.map((s) => (
            <option key={s.toString()} value={s.toString()}>
              {s === scale && !predefinedScales.includes(s) ? `Польз: ${s.toFixed(1)}` : s}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

};

