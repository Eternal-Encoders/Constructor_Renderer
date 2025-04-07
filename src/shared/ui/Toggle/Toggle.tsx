import classNames from "classnames";
import React, { useState } from "react";
import cls from './Toggle.module.scss';

interface IToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text?: string;
}

export const Toggle = ({ className, text, ...otherProps }: IToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    setIsChecked(!isChecked);
  }

  return (
    <div onClick={change} className={classNames(cls.ToggleWrapper, [className])}>
      {text && <span onClick={change} className={cls.text}>{text}</span>}
      <label className={cls.Toggle}> 
        <input {...otherProps} type="checkbox" checked={isChecked} onChange={change}/>
        <span className={cls.control}></span>
      </label>
    </div>
  )
};
