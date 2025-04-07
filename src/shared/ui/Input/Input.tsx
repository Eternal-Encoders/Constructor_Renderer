import classNames from "classnames";
import { memo, useRef } from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">

interface IInputProps extends HTMLInputProps {
  className?: string;
  size?: "small"
  type?: string
  iconLeft?: React.ReactNode | string
  iconRight?: React.ReactNode | string
  value?:string
  onChange?: (event: string) => void
}

export const Input = memo((props: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    className, 
    iconLeft,
    iconRight,
    size = "small", 
    type = "text",
    value,
    onChange,
    ...otherProps
  } = props;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className={classNames(cls.Input, cls[size], [className])}
    >
      {iconLeft && <div className={classNames(cls.Input__leftIcon)}
      >
        {iconLeft}
      </div>}
      <label className={classNames(cls.Input__wrapper)}
      >
        <input 
          {...otherProps} 
          ref={inputRef}
          type={type} 
          value={value} 
          onChange={onChangeHandler} 
          className={classNames(cls.Input__text)} 
        />
      </label>
      {iconRight && <div className={classNames(cls.Input__rightIcon)}
      >
        {iconRight}
      </div>}
    </div>
  );
});
