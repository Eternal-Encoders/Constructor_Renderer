import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import PlusMini from 'assets/PlusMini.svg?react';
import classNames from "classnames";
import { FloorItems } from 'entities/Floors/ui/FloorItems/FloorItems';
import { AddFloorModal } from 'features/AddFloor';
import { useCallback, useState } from 'react';
import cls from "./Floors.module.scss";

interface IFloorsProps {
  className?: string;
}

export const Floors = ({ className }: IFloorsProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isAddFloorModal, setIsAddFloorModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAddFloorModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAddFloorModal(true);
  }, []);

  const rotatingMods = {
    [cls.rotated]: isCollapsed,
    [cls.default]: !isCollapsed
  };

  return (
    <div className={classNames(cls.Floors, {}, [className])}>
      <header 
        className={classNames(cls.Floors__dropdown)} style={{marginBottom: 8}}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div 
          className={classNames(cls.Floors__leftIcon)} style={{marginRight: 2}}>
          <div 
            className={classNames(cls.Floors__icon_arrowDownMini)}
          >
            <ArrowDownMini className={classNames(rotatingMods)}/>
          </div>
        </div>
        <h4 className={classNames(cls.Floors__title)}>
          Этажи
        </h4>
        <div 
          className={classNames(cls.Floors__rightIcon)}
          onClick={onShowModal} 
        >
          <div 
            className={classNames(cls.Floors__icon_plusMini)}
          >
            <PlusMini/>
          </div>
        </div>
        {isAddFloorModal && <AddFloorModal 
          isOpen={isAddFloorModal}
          onClose={onCloseModal}
        />}
      </header>
      {!isCollapsed && <FloorItems/>}
    </div>
  );
};
