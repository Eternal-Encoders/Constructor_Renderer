import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import classNames from "classnames";
import { useState } from 'react';
import { LayersItems } from '../LayersItems/LayersItems';
import cls from "./Layers.module.scss";

interface ILayersProps {
  className?: string;
}

export const Layers = ({ className }: ILayersProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const rotatingMods = {
    [cls.rotated]: isCollapsed,
    [cls.default]: !isCollapsed
  };
  
  return (
    <div 
      className={classNames(cls.Layers, [className], cls.isCollapsed)} >
      <header 
        className={classNames(cls.Layers__dropdown)} style={{marginBottom: 8}}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div 
          className={classNames(cls.Layers__leftIcon)} style={{marginRight: 2}}
        >
          <div 
            className={classNames(cls.Layers__icon_arrowDownMini)} 
          >
            <ArrowDownMini 
              className={classNames(rotatingMods)}
            />
          </div>
        </div>
        <h4 className={classNames(cls.Layers__title)}>
          Слои
        </h4>
      </header>
      {!isCollapsed && <LayersItems/>}
    </div>
  );
};
