import classNames from "classnames";
import { Information } from "shared/ui/Information/Information";
import { Save } from "shared/ui/Save/Save";
import { SettingsCanvas } from "shared/ui/SettingsCanvas/SettingsCanvas";
import cls from "./InfoPanel.module.scss";

interface IInfoPanelProps {
  className?: string;
}

export const InfoPanel = ({ className }: IInfoPanelProps) => {
  return (
    <aside className={classNames(cls.InfoPanel, {}, [className])}>
      <section className={classNames(cls.InfoPanel__save)}>
        <Save/>
      </section>
      <section className={classNames(cls.InfoPanel__information)}>
        <Information/>
      </section>
      <section className={classNames(cls.InfoPanel__settingsCanvas)}>
        <SettingsCanvas/>
      </section>
    </aside>
  );
};
