import classNames from "classnames";
import cls from "./ButtonIcon.module.scss";

type HTMLButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size">

interface IButtonIconProps extends HTMLButtonProps{
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
    onClick ,
    ...otherProps
  } = props;

  return (
    <button 
      {...otherProps}
      className={classNames(cls.ButtonIcon, cls[size], cls[type], [className])} 
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

