import ArrowDown from 'assets/ArrowDown.svg?react';
import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import classNames from "classnames";
// eslint-disable-next-line @stylistic/js/max-len
import { getLayoutLeftPanelWidth } from 'entities/Layout/model/selectors/getLayoutLeftPanelWidth/getLayoutLeftPanelWidth';
import { layoutActions } from 'entities/Layout/model/slice/layoutSlice';
import { useResizablePanel } from 'helpers/hooks/useResizablePanel';
import { useDispatch, useSelector } from 'react-redux';
import { Floors } from 'shared/ui/Floors/Floors';
import { Layers } from 'shared/ui/Layers/Layers';
import cls from "./DropdownPanel.module.scss";

interface IDropdownPanelProps {
  className?: string;
}

export const DropdownPanel = ({ className }: IDropdownPanelProps) => {
  const dispatch = useDispatch();
  const reduxWidth = useSelector(getLayoutLeftPanelWidth);

  const { panelRef, handleMouseDown } = useResizablePanel({
    initialWidth: reduxWidth,
    minWidth: 240,
    maxWidth: 360,
    direction: "left",
    onResize: (width) => dispatch(layoutActions.setLayoutLeftPanel(width)),
  });

  return (
    <div
      ref={panelRef}
      className={classNames(cls.DropdownPanel, {}, [className])}
      style={{ width: `${reduxWidth}px` }}
    >
      <div
        className={cls.Resizer}
        onMouseDown={handleMouseDown}
        style={{ right: 0, left: "auto" }} // 👉 переместим на правую границу
      />
      <div className={classNames(cls.DropdownPanel__content)}>
        <section className={classNames(cls.DropdownPanel__header)} style={{ marginBottom: '12px' }}>
          <h3 className={classNames(cls.DropdownPanel__title)}>
            Главная площадка
          </h3>
          <div className={classNames(cls.DropdownPanel__shrinkArea)}>
            <div className={classNames(cls.DropdownPanel__arrowDown)}>
              <ArrowDown />
            </div>
          </div>
        </section>
        <section className={classNames(
          cls.DropdownPanel__header,
          cls.DropdownPanel__header_second,
          cls.DropdownPanel__header_border
        )}>
          <h3 className={classNames(cls.DropdownPanel__title)}>
            Главная площадка
          </h3>
          <div className={classNames(cls.DropdownPanel__arrowDownMini)} style={{ marginLeft: 12 }}>
            <ArrowDownMini />
          </div>
        </section>
        <section className={classNames(cls.DropdownPanel__floors)}>
          <Floors />
        </section>
        <section className={classNames(cls.DropdownPanel__layers)}>
          <Layers />
        </section>
      </div>
    </div>
  );
};
