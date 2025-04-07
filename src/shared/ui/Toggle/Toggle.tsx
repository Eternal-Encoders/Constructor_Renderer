import { useState } from "react";
import cls from './Toggle.module.scss';

interface IToggleProps {
  className?: string;
}

export const Toggle = ({ className }: IToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className={cls.Toggle}>
      <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
      <span className={cls.control}></span>
    </label>
  )
};
