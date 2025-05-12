import classNames from "classnames";
import { TextTheme } from "../Text/Text";
import cls from "./ButtonText.module.scss";

type HTMLButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size">

interface IButtonTextProps extends HTMLButtonProps {
  className?: string;
  children: React.ReactNode;
  size?: "small" | "medium";
  type?: "default" | "link" | "fill";
  iconLeft?: React.ReactNode | string;
  iconRight?: React.ReactNode | string;
  iconRightStickedToTheEnd?: boolean;
  bold?: boolean;
  disabled?: boolean;
  centered?: boolean;
  inverted?: boolean;
  theme?: TextTheme;
}

export const ButtonText = (props: IButtonTextProps) => {
  
  const { 
    className, 
    children, 
    iconLeft,
    iconRight,
    size = "small",
    type = "default",
    iconRightStickedToTheEnd = false,
    centered = true,
    bold = false,
    disabled = false,
    theme = TextTheme.PRIMARY,
    inverted = false,
    ...otherProps
  } = props;
  
  const mods: Record<string, boolean> = {
    [cls[size]]: true,
    [cls[type]]: true,
    [cls[theme]]: true,
    [cls.disabled]: disabled,
    [cls.bold]: bold,
    [cls.centered]: centered
  };

  return (
    <button 
      {...otherProps}
      className={classNames(cls.ButtonText, mods, [className])}
      disabled={disabled}
    >
      {iconLeft && <div className={classNames(    
        size === "small" 
          ? cls.ButtonText__leftIcon 
          : cls.ButtonText__leftIcon_medium)}
      >
        {iconLeft}
      </div>}
      <div className={classNames(cls.ButtonText__text, {[cls.inverted]: inverted})}>{children}</div>
      {iconRight && <div className={classNames(    
        {[cls.iconRightStickedToTheEnd]: iconRightStickedToTheEnd},
        size === "small" 
          ? cls.ButtonText__rightIcon 
          : cls.ButtonText__rightIcon_medium)}
      >
        {iconRight}
      </div>}
    </button>
  );
};
