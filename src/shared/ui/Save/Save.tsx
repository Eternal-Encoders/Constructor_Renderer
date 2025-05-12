import classNames from "classnames";
import { useState } from "react";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Save.module.scss";

interface ISaveProps {
  className?: string;
}

export const Save = ({ className }: ISaveProps) => {
  const [time, setTime] = useState(new Date().toLocaleString());

  return (
    <div className={classNames(cls.Save, {}, [className])}>
      <div className={classNames(cls.Save__wrapper)}>
        <div className={classNames(cls.Save__text)}>
          Последнее сохранение
        </div>
        <div className={classNames(cls.Save__subtext)}>
          {time}
        </div>
      </div>
      <ButtonText 
        className={classNames(cls.Save__button)}
        onClick={() => setTime(new Date().toLocaleString())}
      >
        Сохранить
      </ButtonText>
    </div>
  );
};
