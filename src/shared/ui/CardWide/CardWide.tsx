import classNames from "classnames";
import cls from "./CardWide.module.scss";

interface ICardWideProps {
  className?: string;
  title: string;
  numberValue: number;
  percentValue: number;
  stonksValue: number;
  date: Date;
  isGreen?: boolean;
}

export const CardWide = (props: ICardWideProps) => {
  const { className, title, numberValue, percentValue, stonksValue, isGreen } = props;
  return (
    <div className={classNames(cls.CardWide, {}, [className])}>
      <h5 className={classNames(cls.CardWide__title)} style={{marginBottom: 16}}>{title}</h5>
      <div className={cls.CardWide__data}>
        <span className={cls.CardWide__number}>{numberValue.toString()}</span>
        {isGreen ? 
          <span className={classNames(cls.CardWide__extra, cls.CardWide__extra_green)}>
            <div className={classNames(cls.CardWide__arrow, cls.CardWide__arrow_green)}>&#11165;</div>
            <div className={classNames(cls.CardWide__percent, cls.CardWide__arrow_green)}>{percentValue}%</div>
          </span> : 
          <span className={classNames(cls.CardWide__extra, cls.CardWide__extra_red)}>
            <div className={classNames(cls.CardWide__arrow, cls.CardWide__arrow_red)}>&#11167;</div>
            <div className={classNames(cls.CardWide__percent, cls.CardWide__arrow_red)}>{percentValue}%</div>
          </span>
        }
      </div>
      <div className={cls.CardWide__aside}>
        {isGreen ? 
          <span className={classNames(cls.CardWide__stonks, cls.CardWide__stonks_green)}>
            +{stonksValue}
          </span> :         
          <span className={classNames(cls.CardWide__stonks, cls.CardWide__stonks_red)}>
            -{stonksValue}
          </span>
        }
        <span className={cls.CardWide__date}>15 апр — 21 мая</span>
      </div>
    </div>
  );
};
