import classNames from "classnames";
import cls from "./SelectorItem.module.scss";

interface ISelectorItemProps {
  className?: string;
  children: React.ReactNode
  size?: "small" | "medium"
  type?: "default" | "link" | "fill"
  iconTop?: React.ReactNode | string
  disabled?: boolean
  onClick: () => void
}

export const SelectorItem = (props: ISelectorItemProps) => {
  
  //TODO: upgrade borders, TURN ON borders with WIDTH!

  const { 
    className, 
    children, 
    iconTop,
    size = "small", 
    type = "default",
    disabled = false,
    onClick
  } = props;

  let classSize:string = '';

  switch (size) {
    case "small":
      classSize = cls.SelectorItem__iconTop_small;
      break;
    case "medium":
      classSize = cls.SelectorItem__iconTop_medium;
      break;
  }

  return (
    <button 
      className={classNames(
        cls.SelectorItem, 
        {'smallWithoutIcon': !iconTop}, 
        {'mediumWithoutIcon': !iconTop}, 
        cls[size], 
        cls[type], 
        [className])}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={classNames(cls.SelectorItem__iconTop, classSize)}
      >
        {iconTop}
      </div>
      <div className={classNames(cls.SelectorItem__text)}>{children}</div>
    </button>
  );
};
