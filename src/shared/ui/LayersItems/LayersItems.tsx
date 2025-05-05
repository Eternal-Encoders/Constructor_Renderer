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
    </ul>
  );
};
