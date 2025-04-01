import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import PlusMini from 'assets/PlusMini.svg?react';
import classNames from "classnames";
import { FloorLayers } from '../FloorLayers/FloorLayers';
import cls from "./Floors.module.scss";

interface IFloorsProps {
  className?: string;
}

export const Floors = ({ className }: IFloorsProps) => {

  const isCollapsed = false;

  return (
    <div className={classNames(cls.Floors, {}, [className])}>
      <header className={classNames(cls.Floors__dropdown)} style={{marginBottom: 8}}>
        <div className={classNames(cls.Floors__leftIcon)} style={{marginRight: 2}}>
          <div className={classNames(cls.Floors__icon_arrowDownMini)}
          >
            <ArrowDownMini/>
          </div>
        </div>
        <h4 className={classNames(cls.Floors__title)}>
          Этажи
        </h4>
        <div className={classNames(cls.Floors__rightIcon)}>
          <div className={classNames(cls.Floors__icon_plusMini)}>
            <PlusMini/>
          </div>
        </div>
      </header>
      {!isCollapsed && <FloorLayers/>}
    </div>
  );
};
