import classNames from "classnames";
import { FigureType, Polygon, Rectangle } from "entities/Figure";
import { getLayoutRightPanelWidth } from "entities/Layout";
import { layoutActions } from "entities/Layout/model/slice/layoutSlice";
import { LoadBackgroundForCanvas } from "features/LoadBackgroundForCanvas";
import { useResizablePanel } from "helpers/hooks/useResizablePanel";
import { useDispatch, useSelector } from "react-redux";
import { Information } from "shared/ui/Information/Information";
import { Save } from "shared/ui/Save/Save";
import { SectionPanel } from "shared/ui/SectionPanel/ui/SectionPanel";
import cls from "./InfoPanel.module.scss";

interface IInfoPanelProps {
  className?: string;
  figures: (Polygon | Rectangle)[];
  selectedId: string | null;
  selectedFigure: FigureType;
  setSelectedFigure: (figure: FigureType) => void;
}

export const InfoPanel = ({ className, figures, selectedId, selectedFigure, setSelectedFigure }: IInfoPanelProps) => {
  const dispatch = useDispatch();
  const reduxWidth = useSelector(getLayoutRightPanelWidth);

  const { panelRef, handleMouseDown } = useResizablePanel({
    initialWidth: reduxWidth,
    minWidth: 240,
    maxWidth: 360,
    onResize: (width) => dispatch(layoutActions.setLayoutRightPanel(width)),
  });

  const figure = figures.find((figure) => figure.id === selectedId);

  return (
    <aside
      ref={panelRef}
      className={classNames(cls.InfoPanel, {}, [className])}
      style={{ width: `${reduxWidth}px` }}
    >
      <div
        className={cls.Resizer}
        onMouseDown={handleMouseDown}
      />
      <section className={cls.InfoPanel__save}>
        <Save />
      </section>
      {selectedId && figure && <section className={cls.InfoPanel__object}>
        <Information 
          figure={figure} 
          selectedId={selectedId} 
          selectedFigure={selectedFigure} 
          setSelectedFigure={setSelectedFigure} 
        />
      </section>}
      <SectionPanel title="Настройки холста">
        <LoadBackgroundForCanvas/>
      </SectionPanel>
    </aside>
  );
};
