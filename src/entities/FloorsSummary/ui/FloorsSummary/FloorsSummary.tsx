import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import PlusMini from 'assets/PlusMini.svg?react';
import classNames from "classnames";
import { AddFloorModal } from 'features/AddFloor';
import { useCallback, useState } from 'react';
import { FloorItems } from '../FloorsItems/FloorItems';
import cls from "./FloorsSummary.module.scss";

interface IFloorsSummaryProps {
  className?: string;
}

export const FloorsSummary = ({ className }: IFloorsSummaryProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isAddFloorModal, setIsAddFloorModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAddFloorModal(false);
  }, []);

  const onShowModal = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setIsAddFloorModal(true);
  }, []);

  const handleCollapse = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (isAddFloorModal) return;
    setIsCollapsed((prev) => !prev)
  }, [isAddFloorModal]);

  const rotatingMods = {
    [cls.rotated]: isCollapsed,
    [cls.default]: !isCollapsed
  };

  return (
    <div className={classNames(cls.FloorsSummary, {}, [className])}>
      <header 
        className={classNames(cls.FloorsSummary__dropdown)} style={{marginBottom: 8}}
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleCollapse(e)}
      >
        <div 
          className={classNames(cls.FloorsSummary__leftIcon)} style={{marginRight: 2}}>
          <div 
            className={classNames(cls.FloorsSummary__icon_arrowDownMini)}
          >
            <ArrowDownMini className={classNames(rotatingMods)}/>
          </div>
        </div>
        <h4 className={classNames(cls.FloorsSummary__title)}>
          Этажи
        </h4>
        <div 
          className={classNames(cls.FloorsSummary__rightIcon)}
          onClick={onShowModal} 
        >
          <div 
            className={classNames(cls.FloorsSummary__icon_plusMini)}
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