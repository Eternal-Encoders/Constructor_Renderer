import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import classNames from "classnames";
import cls from "./Layers.module.scss";

interface ILayersProps {
  className?: string;
}

export const Layers = ({ className }: ILayersProps) => {
  const isCollapsed = false;

  return (
    <div className={classNames(cls.Layers, {}, [className])}>
      <header className={classNames(cls.Layers__dropdown)} style={{marginBottom: 8}}>
        <div className={classNames(cls.Layers__leftIcon)} style={{marginRight: 2}}>
          <div className={classNames(cls.Layers__icon_arrowDownMini)}
          >
            <ArrowDownMini/>
          </div>
        </div>
        <h4 className={classNames(cls.Layers__title)}>
          Слои
        </h4>
      </header>
      {/* {!isCollapsed && <LayersItems/>} */}
    </div>
  );
};
