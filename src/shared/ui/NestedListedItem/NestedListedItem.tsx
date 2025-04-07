import classNames from "classnames";
import cls from "./NestedListedItem.module.scss";

interface INestedListedItemProps {
  className?: string;
  children: React.ReactNode
  size?: "small"
  type?: "default" | "stroke"
  iconLeft?: React.ReactNode | string
  iconRight?: React.ReactNode | string
}

export const NestedListedItem = (props: INestedListedItemProps) => {
  
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
      className={classNames(cls.NestedListedItem, cls[size], cls[type], [className])}
    >
      {iconLeft && <div className={classNames(cls.NestedListedItem__leftIcon)}
      >
        {iconLeft}
      </div>}
      <div className={classNames(cls.NestedListedItem__text)}
      >
        {children}
      </div>
      {iconRight && <div className={classNames(cls.NestedListedItem__rightIcon)}
      >
        {iconRight}
      </div>}
    </button>
  );
};
