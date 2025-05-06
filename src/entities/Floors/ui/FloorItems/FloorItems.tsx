import Prison from 'assets/Prison.svg?react';
import classNames from "classnames";
import { FloorSchema } from 'entities/Floors/model/types/floorSchema';
import { useSelector } from 'react-redux';
import { getFloors } from '../../model/selectors/getFloors/getFloors';
import cls from "./FloorItems.module.scss";

interface IFloorItemsProps {
  className?: string;
}

export const FloorItems = ({ className }: IFloorItemsProps) => {
  const floors = useSelector(getFloors);
  
  return (
    <ul className={classNames(cls.FloorItems, {}, [className])}>
      {floors && floors.map((floor: FloorSchema) => (
        <li className={classNames(cls.FloorItems__item)} key={floor.id}>
          <div className={classNames(cls.FloorItems__leftIcon)}>
            <Prison/>
          </div>
          <h6 className={classNames(cls.FloorItems__title)}>{floor.name}</h6>
        </li>
      ))}
    </ul>
  );
};
