import classNames from "classnames";
import { memo, useRef } from "react";
import cls from "./TextArea.module.scss";

type HTMLTextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">

interface ITextAreaProps extends HTMLTextAreaProps {
  className?: string;
  size?: "small"
  value?:string
  onChange?: (event: string) => void
}

export const TextArea = memo((props: ITextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    className, 
    size = "small", 
    value,
    onChange,
    ...otherProps
  } = props;

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div 
      onClick={() => textAreaRef.current?.focus()}
      className={classNames(cls.TextArea, cls[size], [className])}
    >
      <label className={classNames(cls.TextArea__wrapper)}
      >
        <textarea 
          {...otherProps} 
          ref={textAreaRef}
          value={value} 
          onChange={onChangeHandler} 
          className={classNames(cls.TextArea__text)} 
        />
      </label>
    </div>
  );
});
