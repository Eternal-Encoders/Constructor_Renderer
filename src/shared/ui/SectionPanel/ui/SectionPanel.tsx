import classNames from "classnames";
import { Text } from 'shared/ui/Text/Text';
import cls from "./SectionPanel.module.scss";

interface ISettingsCanvasProps {
  className?: string;
  title?: string;
  children: React.ReactNode;
}

export const SectionPanel = (props: ISettingsCanvasProps) => {

  const {
    className,
    title,
    children,
  } = props;

  return (
    <div className={classNames(cls.SectionPanel, {}, [className])}>
      {title &&  <header className={classNames(cls.SectionPanel__header)}>
        <Text title={title}/>
      </header>}
      {children}
    </div>
  );
};
