import classNames from "classnames";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
  DANGER = 'danger',
  ERROR = "error",
}

interface ITextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text = (props: ITextProps) => {

  const { 
    className, 
    title, 
    text, 
    theme = TextTheme.PRIMARY,
  } = props;

  return (
    <div className={classNames(cls.Text, { [cls[theme]]: true }, [className])}>
      {title && <h4 className={cls.title}>{title}</h4>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
};
