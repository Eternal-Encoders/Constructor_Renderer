import classNames from "classnames";
import cls from "./CardCommercial.module.scss";

interface ICardCommercialProps {
  className?: string;
  title: string;
  description: string;
  color: string;
  background: string;
  category: ECategoryModule;
  priceValue: number;
  imgSrc?: string;
}

export enum ECategoryModule {
  AI = 'AI',
  TYPOGRAPHY = 'Типографика',
  TECHNICAL = 'Техническое'
}

export const CardCommercial = (props: ICardCommercialProps) => {
  const { className, title, category, color, background, priceValue, description, imgSrc } = props;
  return (
    <div className={classNames(cls.CardCommercial, [className])}>
      <img className={classNames(cls.CardCommercial__img)} src={imgSrc} alt="" />
      <h5 className={classNames(cls.CardCommercial__title)} style={{marginBottom: 16}}>{title}</h5>
      <span className={classNames(cls.CardCommercial__description)}>
        {description}
      </span>
      <div className={cls.CardCommercial__category}>
        <span 
          className={cls.CardCommercial__categoryText} 
          style={{color, background}}
        >
          {category}
        </span>
        <span className={cls.CardCommercial__interval}>Один проект в месяц</span>
      </div>
      <div className={cls.CardCommercial__price}>
        <span className={cls.CardCommercial__asideText}>от</span>
        <span className={cls.CardCommercial__priceValue}>{priceValue}&nbsp;₽</span>
      </div>
    </div>
  );
};
