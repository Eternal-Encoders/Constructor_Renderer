import classNames from "classnames";
import React, { useState } from "react";
import cls from './Toggle.module.scss';

interface IToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text?: string;
  color?: 'blue' | 'red';
}

export const Toggle = ({ className, text, color = 'blue', ...otherProps }: IToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    setIsChecked(!isChecked);
  }

  return (
    <div onClick={change} className={classNames(cls.ToggleWrapper, [className])}>
      <div style={{display: 'flex', justifyContent: 'center', height: '100%', marginRight: 8}}>
        {text && <span onClick={change} className={cls.text}>{text}</span>}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
        <label className={cls.Toggle}> 
          <input {...otherProps} type="checkbox" checked={isChecked} onChange={change}/>
          <span className={classNames(cls.control, color === 'blue' ? cls.controlBlue : cls.controlRed)}></span>
        </label>
      </div>
    </div>
  )
};
