import ArrowDown from 'assets/ArrowDown.svg?react';
import ArrowDownMini from 'assets/ArrowDownMini.svg?react';
import classNames from "classnames";
import { getBuildingName } from 'entities/Building';
import { Polygon, Rectangle } from 'entities/Figure';
import { FloorsSummary } from 'entities/FloorsSummary/ui/FloorsSummary/FloorsSummary';
import { Layers } from 'entities/Layers/ui/Layers/Layers';
import { getLayoutLeftPanelWidth } from 'entities/Layout';
import { layoutActions } from 'entities/Layout/model/slice/layoutSlice';
import { useResizablePanel } from 'helpers/hooks/useResizablePanel';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from "./DropdownPanel.module.scss";

interface IDropdownPanelProps {
  className?: string;
  figures: (Polygon | Rectangle)[];
  selectedId: string | null;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}

export const DropdownPanel = ({ className, figures, selectedId, setSelectedId }: IDropdownPanelProps) => {
  const dispatch = useDispatch();
  const buildingName = useSelector(getBuildingName);
  const reduxWidth = useSelector(getLayoutLeftPanelWidth);

  const { panelRef, handleMouseDown } = useResizablePanel({
    initialWidth: reduxWidth,
    minWidth: 240,
    maxWidth: 360,
    direction: "left",
    onResize: (width) => dispatch(layoutActions.setLayoutLeftPanel(width)),
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const rotatingMods = {
    [cls.rotated]: isCollapsed,
    [cls.default]: !isCollapsed
  };

  useEffect(() => {
    if (isCollapsed) {
      dispatch(layoutActions.setLayoutLeftPanel(0));
    } else {
      dispatch(layoutActions.setLayoutLeftPanel(240));
    } 
    return () => {
      dispatch(layoutActions.setLayoutLeftPanel(240))
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  return (
    <div
      ref={panelRef}
      className={classNames(cls.DropdownPanel, isCollapsed && cls.DropdownPanel_compact, [className])}
      style={{ width: `${reduxWidth}px` }}
    >
      <div
        className={cls.Resizer}
        onMouseDown={handleMouseDown}
        style={{ right: 0, left: "auto" }}
      />
      <div 
        className={classNames(cls.DropdownPanel__content, isCollapsed && cls.DropdownPanel__content_compact)}>
        <section 
          className={classNames(cls.DropdownPanel__header, isCollapsed && cls.DropdownPanel__header_compact)} 
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <h3 
            className={classNames(cls.DropdownPanel__title)}>
            {isCollapsed && buildingName}
          </h3>
          <div 
            className={classNames(cls.DropdownPanel__shrinkArea)}>
            <div 
              className={classNames(cls.DropdownPanel__arrowDown)}>
              <ArrowDown 
                className={classNames(rotatingMods)}/>
            </div>
          </div>
        </section>
        {!isCollapsed && <>
          <section className={classNames(
            cls.DropdownPanel__header,
            cls.DropdownPanel__header_second,
            cls.DropdownPanel__header_border
          )}>
            <h3 className={classNames(cls.DropdownPanel__title)}>
              {buildingName}
            </h3>
            <div className={classNames(cls.DropdownPanel__arrowDownMini)} style={{ marginLeft: 12 }}>
              <ArrowDownMini />
            </div>
          </section>
          <section className={classNames(cls.DropdownPanel__floors)}>
            <FloorsSummary />
          </section>
          <section className={classNames(cls.DropdownPanel__layers)}>
            <Layers 
              figures={figures} 
              selectedId={selectedId} 
              setSelectedId={setSelectedId}
            />
          </section>
        </>}
      </div>
    </div>
  );
};
