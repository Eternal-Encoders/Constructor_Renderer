import classNames from "classnames";
import { useState } from "react";
import cls from "./LockIcon.module.scss";

interface ILockIconProps {
  className?: string;
  initialStateIsLocked?: boolean;
}

export const LockIcon = (props: ILockIconProps) => {
  const { 
    className, 
    initialStateIsLocked,
  } = props;

  const [isLocked, setIsLocked] = useState(false);

  if (initialStateIsLocked !== undefined) setIsLocked(initialStateIsLocked);

  const onClick = () => setIsLocked((prev) => !prev);

  return (
    <button 
      className={classNames(cls.LockIcon, [className])} 
      onClick={onClick}
    >
      {isLocked ? '🔒' : '🔓'}
    </button>
  );
};

