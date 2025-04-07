import classNames from "classnames";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Save.module.scss";

interface ISaveProps {
  className?: string;
}

export const Save = ({ className }: ISaveProps) => {
  return (
    <div className={classNames(cls.Save, {}, [className])}>
      <div className={classNames(cls.Save__wrapper)}>
        <div className={classNames(cls.Save__text)}>
          Последнее сохранение
        </div>
        <div className={classNames(cls.Save__subtext)}>
          {new Date().toLocaleString()}
        </div>
      </div>
      <ButtonText className={classNames(cls.Save__button)}>
        Сохранить
      </ButtonText>
    </div>
  );
};
