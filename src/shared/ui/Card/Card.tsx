import classNames from "classnames";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Card.module.scss";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  children: React.ReactNode;
  buttonTitle?: string; 
  buttonTitleIcon?: React.ReactNode | string;
  buttonTitlePreIcon?: React.ReactNode | string;
  onClickButtonTitle?: () => void;
}

export const Card = (props: ICardProps) => {
  const {
    className,
    title,
    children,
    buttonTitle,
    buttonTitleIcon,
    buttonTitlePreIcon,
    onClickButtonTitle,
    ...otherProps
  } = props;
  
  return (
    <div {...otherProps} className={classNames(cls.Card, {}, [className])}>
      <div className={classNames(cls.Card__content)}>
        <header className={classNames(cls.Card__header)}>
          <h4 className={classNames(cls.Card__title)} style={{marginBottom: 8}}>
            {title}
          </h4>
          {buttonTitle && <div style={{display: 'flex', justifyContent: 'center', marginBottom: 8}}>
            <ButtonText 
              iconRight={<b>{buttonTitleIcon}</b>}
              iconLeft={<b>{buttonTitlePreIcon}</b>}
              onClick={onClickButtonTitle}
              size="small"
              style={{width: 336}}
            >
              {buttonTitle}
            </ButtonText>
          </div>}
        </header>
        {children}
      </div>
    </div>
  );
};
