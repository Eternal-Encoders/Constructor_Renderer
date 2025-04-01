import Prison from 'assets/Prison.svg?react';
import classNames from "classnames";
import cls from "./LayersItems.module.scss";

interface ILayersItemsProps {
  className?: string;
}

export const LayersItems = ({ className }: ILayersItemsProps) => {
  const isActive = true;
  return (
    <ul className={classNames(cls.LayersItems, {}, [className])}>
      <li className={classNames(cls.LayersItems__item)}>
        <div className={classNames(cls.LayersItems__leftIcon)}>
          <Prison/>
        </div>
        <h6 className={classNames(cls.LayersItems__title)}>Дверь 1</h6>
      </li>
      <li className={classNames(cls.LayersItems__item, isActive && cls.LayersItems__item_active)}>
        <div className={classNames(cls.LayersItems__leftIcon)}>
          <Prison/>
        </div>
        <h6 className={classNames(cls.LayersItems__title)}>Комната 2</h6>
      </li>
    </ul>
  );
};
