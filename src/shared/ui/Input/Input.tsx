import classNames from "classnames";
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">

interface IInputProps extends HTMLInputProps {
  className?: string;
  children?: React.ReactNode;
  size?: "small";
  type?: string;
  autoFocus?: boolean,
  iconLeft?: React.ReactNode | string;
  iconRight?: React.ReactNode | string;
  value?:string;
  onChange?: (event: string | File) => void;
}

export const Input = memo(forwardRef<HTMLInputElement, IInputProps>((props, ref) => {  
  const { 
    className,
    children, 
    iconLeft,
    iconRight,
    autoFocus,
    size = "small", 
    type = "text",
    value,
    onChange,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  useImperativeHandle(ref, () => inputRef.current!, []);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const onChangeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    onChange?.(event.target.files?.[0]);
  };

  const onChangeValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;
    onChange?.(event.target.value);
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const layoutByType = (handler: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (
      <label className={classNames(cls.Input__wrapper)}>
        {children}
        <input 
          {...otherProps} 
          autoFocus={isFocused}
          ref={inputRef}
          type={type} 
          value={value} 
          onChange={handler} 
          className={classNames(cls.Input__text_hidden)} 
        />
      </label> 
    );
  }
  
  return (
    type === 'file' ?       
      layoutByType(onChangeFileHandler)
      :    
      type === 'color' ?
        layoutByType(onChangeValueHandler)
        :
        <div 
          onClick={() => (ref as React.RefObject<HTMLInputElement>)?.current?.focus()}
          className={classNames(cls.Input, cls[size], [className])}
        >
          {iconLeft && <div className={classNames(cls.Input__leftIcon)}
          >
            {iconLeft}
          </div>}
          <label className={classNames(cls.Input__wrapper)}>
            {children}
            <input 
              {...otherProps} 
              autoFocus={isFocused}
              ref={inputRef}
              type={type} 
              value={value} 
              onChange={onChangeInputHandler} 
              className={classNames(cls.Input__text)} 
            />
          </label>
          {iconRight && <div className={classNames(cls.Input__rightIcon)}
          >
            {iconRight}
          </div>}
        </div>
  );
}));
