import classNames from "classnames";
import { getFloorsSummary } from 'entities/FloorsSummary/model/selectors/getFloorsSummary/getFloorsSummary';
import { EditFloorModal } from "features/EditFloor";
import { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import cls from "./FloorItems.module.scss";

interface IFloorItemsProps {
  className?: string;
}

export const FloorItems = ({ className }: IFloorItemsProps) => {
  const floors = useSelector(getFloorsSummary);

  const [isEditFloorModal, setIsEditFloorModal] = useState(false);
  const [selectedFloorId, setSelectedFloorId] = useState('');

  const onCloseModal = useCallback(() => {
    setIsEditFloorModal(false);
  }, []);
  
  const onShowModal = useCallback((id: string) => {
    setIsEditFloorModal(true);
    setSelectedFloorId(id);
  }, []);
  
  return (
    <ul className={classNames(cls.FloorItems, {}, [className])}>
      {floors && floors.floors?.map((floor) => {
        return (
          (
            <li className={classNames(cls.FloorItems__item)} key={floor.id}>
              <h6 className={classNames(cls.FloorItems__title)}>{floor.name}</h6>
              <div 
                className={classNames(cls.FloorItems__rightIcons)} 
              >
                <div 
                  className={classNames(cls.FloorItems__icon_edit)} 
                  onClick={() => onShowModal(floor.id)}
                >
                  ✎
                </div>
              </div>
            </li>
          )
          
        );
        
      }
      )
      }
      {isEditFloorModal && <EditFloorModal 
        isOpen={isEditFloorModal}
        onClose={onCloseModal}
        selectedFloorId={selectedFloorId}
      />}
    </ul>
  );
};