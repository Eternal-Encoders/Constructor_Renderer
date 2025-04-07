import classNames from "classnames";
import cls from "./ListedItem.module.scss";

interface IListedItemProps {
  className?: string;
  children: React.ReactNode
  size?: "small"
  type?: "default" | "stroke"
  iconLeft?: React.ReactNode | string
  iconRight?: React.ReactNode | string
}

export const ListedItem = (props: IListedItemProps) => {
  
  const { 
    className, 
    children, 
    iconLeft,
    iconRight,
    size = "small", 
    type = "default"
  } = props;

  return (
    <button 
      className={classNames(cls.ListedItem, cls[size], cls[type], [className])}
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
