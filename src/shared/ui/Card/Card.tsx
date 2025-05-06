import classNames from "classnames";
import { ButtonText } from "../ButtonText/ButtonText";
import { ListedItem } from "../ListedItem/ListedItem";
import cls from "./Card.module.scss";

interface ICardProps {
  className?: string;
}

export const Card = ({ className }: ICardProps) => {
  return (
    <div className={classNames(cls.Card, {}, [className])}>
      <div className={classNames(cls.Card__content)}>
        <header className={classNames(cls.Card__header)}>
          <h4 className={classNames(cls.Card__title)} style={{marginBottom: 8}}>
            Выбор проекта
          </h4>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 8}}>
            <ButtonText 
              iconRight={<b>+</b>}
              size="small"
              style={{width: 336}}
            >
              Добавить проект
            </ButtonText>
          </div>
        </header>
        <ul role="list" className={classNames(cls.Card__list)}>
          <ListedItem style={{width: '100%', marginBottom: '8px'}} selected>
            Уральский федеральный университет
          </ListedItem>
          <ListedItem style={{width: '100%', marginBottom: '8px'}}>
            Кампус "Кольцово"
          </ListedItem>
        </ul>
      </div>
    </div>
  );
};
