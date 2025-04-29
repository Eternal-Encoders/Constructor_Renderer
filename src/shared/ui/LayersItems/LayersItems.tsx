import Prison from 'assets/Prison.svg?react';
import classNames from "classnames";
import { getLayersFigures } from 'entities/Layers/model/selectors/getLayersFigures/getLayersFigures';
import { useSelector } from 'react-redux';
import cls from "./LayersItems.module.scss";

interface ILayersItemsProps {
  className?: string;
}

export const LayersItems = ({ className }: ILayersItemsProps) => {
  const figures = useSelector(getLayersFigures);

  // const isActive = true;
  return (
    <ul className={classNames(cls.LayersItems, {}, [className])}>
      {figures && figures.map((layer) => (
        <li className={classNames(cls.LayersItems__item)}>
          <div className={classNames(cls.LayersItems__leftIcon)}>
            <Prison/>
          </div>
          <h6 className={classNames(cls.LayersItems__title)}>{layer.type}</h6>
        </li>
      ))}
      {/* <li className={classNames(cls.LayersItems__item)}>
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
      </li> */}
    </ul>
  );
};
