import classNames from "classnames";
import cls from './Skeleton.module.scss';

interface ISkeleton extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  text?: boolean;
  card?:boolean;
  className?: string;
}

export const Skeleton = (props: ISkeleton) => {
  const {
    width,
    height,
    circle = false,
    text = false,
    card = false,
    className,
    ...otherProps
  } = props;

  const style: React.CSSProperties = {
    width,
    height,
  };

  const mods: Record<string,boolean> = {
    [cls.circle]: circle,
    [cls.text] : text,
    [cls.card] : card,
  }

  return <div {...otherProps} className={classNames(cls.Skeleton, mods, [className])} style={style} />;
};
