import classNames from "classnames";
import cls from "./ButtonText.module.scss";

type HTMLButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size">

interface IButtonTextProps extends HTMLButtonProps {
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
    iconLeft,
    size = "small", 
    type = "default",
    disabled = false,
    ...otherProps
  } = props;

  return (
    <button 
      {...otherProps}
      className={classNames(cls.ButtonText, cls[size], cls[type], [className])}
      disabled={disabled}
    >
      {iconLeft && <div className={classNames(size === "small" 
        ? cls.ButtonText__leftIcon 
        : cls.ButtonText__leftIcon_medium)}
      >
        {iconLeft}
      </div>}
      <div className={classNames(cls.ButtonText__text)}>{children}</div>
    </button>
  );
};
