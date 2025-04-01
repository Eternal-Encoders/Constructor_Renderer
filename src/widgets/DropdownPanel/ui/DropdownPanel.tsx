import ArrowDown from 'assets/ArrowDown.svg?react';
import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import classNames from "classnames";
import { Floors } from 'shared/ui/Floors/Floors';
import { Layers } from 'shared/ui/Layers/Layers';
import cls from "./DropdownPanel.module.scss";

interface IDropdownPanelProps {
  className?: string;
}

export const DropdownPanel = ({ className }: IDropdownPanelProps) => {
    
  const dropdownTitle = 'Главная площадка';
  const isCollapsed = false;

  return (
    <div className={classNames(cls.DropdownPanel, {}, [className])}>
      <div className={classNames(cls.DropdownPanel__content)}>
        <section className={classNames(cls.DropdownPanel__header)} 
          style={{ marginBottom: '12px' }}>
          <h3 className={classNames(cls.DropdownPanel__title)}>
            {isCollapsed && dropdownTitle}  
          </h3>
          <div className={classNames(cls.DropdownPanel__shrinkArea)}>
            <div className={classNames(cls.DropdownPanel__arrowDown)}>
              <ArrowDown/>
            </div>
          </div>
        </section>
        <section className={classNames(cls.DropdownPanel__header, cls.DropdownPanel__header_second, 
          cls.DropdownPanel__header_border)}
        >
          <h3 className={classNames(cls.DropdownPanel__title)}>
            {!isCollapsed && dropdownTitle}  
          </h3>
          <div className={classNames(cls.DropdownPanel__arrowDownMini, cls.DropdownPanel__arrowDownMini)} 
            style={{marginLeft: 12}}
          >
            <ArrowDownMini/>
          </div>
        </section>
        <section className={classNames(cls.DropdownPanel__floors)}>
          <Floors/>
        </section>
        <section className={classNames(cls.DropdownPanel__layers)}>
          <Layers/>
        </section>
      </div>
    </div>
  );
};
