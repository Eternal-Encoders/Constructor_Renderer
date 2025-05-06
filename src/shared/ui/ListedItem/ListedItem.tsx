import classNames from "classnames";
import cls from "./ListedItem.module.scss";

type HTMLButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size">

interface IListedItemProps extends HTMLButtonProps {
  className?: string;
  children: React.ReactNode;
  size?: "small";
  type?: "default" | "stroke";
  iconLeft?: React.ReactNode | string;
  iconRight?: React.ReactNode | string;
  selected?: boolean;
}

export const ListedItem = (props: IListedItemProps) => {
  
  const { 
    className, 
    children, 
    iconLeft,
    iconRight,
    size = "small", 
    type = "default",
    selected = false,
    ...otherProps
  } = props;

  return (
    <button 
      {...otherProps}
      className={classNames(cls.ListedItem, cls[size], cls[type], [className], {[cls.selected]: selected})}
    >
      {iconLeft && <div className={classNames(cls.ListedItem__leftIcon)}
      >
        {iconLeft}
      </div>}
      <div className={classNames(cls.ListedItem__text)}
      >
        {children}
      </div>
      {iconRight && <div className={classNames(cls.ListedItem__rightIcon)}
      >
        {iconRight}
      </div>}
    </button>
  );
};
