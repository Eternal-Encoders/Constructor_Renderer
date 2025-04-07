import ArrowRight from 'assets/ArrowRight.svg?react';
import classNames from "classnames";
import { useState } from "react";
import cls from "./ExpandableSectionHeader.module.scss";

interface IExpandableSectionHeaderProps {
  className?: string;
  children: React.ReactNode
  size?: "small"
  type?: "default" | "stroke"
  expandable?: boolean
  iconRight?: React.ReactNode | string
}

export const ExpandableSectionHeader = (props: IExpandableSectionHeaderProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    className, 
    children, 
    iconRight,
    expandable = true,
    size = "small", 
    type = "default"
  } = props;

  return (
    <button 
      className={classNames(cls.ExpandableSectionHeader, cls[size], cls[type], [className])}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      {expandable && <div className={classNames(cls.ExpandableSectionHeader__leftIcon)}
      >
        {isExpanded ? <ArrowRight transform='rotate(90)'/> : <ArrowRight/>}
      </div>}
      <div className={classNames(cls.ExpandableSectionHeader__text)}
      >
        {children}
      </div>
      {iconRight && <div className={classNames(cls.ExpandableSectionHeader__rightIcon)}
      >
        {iconRight}
      </div>}
    </button>
  );
};
