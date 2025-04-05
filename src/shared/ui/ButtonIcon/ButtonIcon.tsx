import classNames from "classnames";
import cls from "./ButtonIcon.module.scss";

interface IButtonIconProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void
  disabled?: boolean
}

export const ButtonIcon = (props: IButtonIconProps) => {

  const { className, children, ...otherProps } = props;

  return (
    <button 
      className={classNames(cls.ButtonIcon, [className])} 
      {...otherProps}
    >
      {children}
    </button>
  );
};
