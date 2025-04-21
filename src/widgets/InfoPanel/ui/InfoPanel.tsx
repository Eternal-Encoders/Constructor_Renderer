import classNames from "classnames";
// eslint-disable-next-line @stylistic/js/max-len
import { getLayoutRightPanelWidth } from "entities/Layout/model/selectors/getLayoutRightPanelWidth/getLayoutRightPanelWidth";
import { layoutActions } from "entities/Layout/model/slice/layoutSlice";
import { useResizablePanel } from "helpers/hooks/useResizablePanel";
import { useDispatch, useSelector } from "react-redux";
import { Information } from "shared/ui/Information/Information";
import { Save } from "shared/ui/Save/Save";
import { SettingsCanvas } from "shared/ui/SettingsCanvas/SettingsCanvas";
import cls from "./InfoPanel.module.scss";

interface IInfoPanelProps {
  className?: string;
}

export const InfoPanel = ({ className }: IInfoPanelProps) => {
  const dispatch = useDispatch();
  const reduxWidth = useSelector(getLayoutRightPanelWidth);

  const { panelRef, handleMouseDown } = useResizablePanel({
    initialWidth: reduxWidth,
    minWidth: 240,
    maxWidth: 360,
    onResize: (width) => dispatch(layoutActions.setLayoutRightPanel(width)),
  });

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
      <section className={cls.InfoPanel__information}>
        <Information />
      </section>
      <section className={cls.InfoPanel__settingsCanvas}>
        <SettingsCanvas />
      </section>
    </aside>
  );
};
