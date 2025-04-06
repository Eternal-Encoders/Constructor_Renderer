import classNames from "classnames";
import cls from "./ButtonIcon.module.scss";

interface IButtonIconProps {
  className?: string;
  children: React.ReactNode;
  size?: "tiny" | "small" | "medium"
  type?: "default" | "link" | "fill"
  onClick?: () => void
  disabled?: boolean
}

export const ButtonIcon = (props: IButtonIconProps) => {

  const { 
    className, 
    children, 
    disabled, 
    size = "tiny", 
    type = "default",
    onClick 
  } = props;

  return (
    <button 
      className={classNames(cls.ButtonIcon, cls[size], cls[type], [className])} 
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

