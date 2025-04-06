import classNames from "classnames";
import cls from "./ButtonText.module.scss";

interface IButtonTextProps {
  className?: string;
  children: React.ReactNode
  size?: "small" | "medium"
  type?: "default" | "link" | "fill"
  iconLeft?: React.ReactNode | string
  disabled?: boolean
}

export const ButtonText = (props: IButtonTextProps) => {
  
  const { 
    className, 
    children, 
    size = "small", 
    type = "default",
    iconLeft,
    disabled = false
  } = props;

  return (
    <button 
      className={classNames(cls.ButtonText, cls[size], cls[type], [className])}
      disabled={disabled}
    >
      <div className={classNames(size === "small" ? cls.ButtonText__leftIcon : cls.ButtonText__leftIcon_medium)}
      >
        {iconLeft}
      </div>
      <div className={classNames(cls.ButtonText__text)}>{children}</div>
    </button>
  );
};
