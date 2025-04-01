import Plus from 'assets/Plus.svg?react';
import classNames from "classnames";
import cls from "./SettingsCanvas.module.scss";

interface ISettingsCanvasProps {
  className?: string;
}

export const SettingsCanvas = ({ className }: ISettingsCanvasProps) => {
  return (
    <div className={classNames(cls.SettingsCanvas, {}, [className])}>
      <header className={classNames(cls.SettingsCanvas__header)} style={{ marginBottom: '8px' }}>
        <h4 className={classNames(cls.SettingsCanvas__title)}>
          Настройки холста
        </h4>
      </header>
      <div className={classNames(cls.SettingsCanvas__content)}>
        <section className={classNames(cls.Section, cls.SettingsCanvas__section, cls.SettingsCanvas__backgroundImage)} 
          style={{ marginBottom: '8px' }}>
          <header className={classNames(cls.Section__header)} style={{ marginBottom: '8px' }}>
            <h5 className={classNames(cls.Section__title)} >
              Фоновое изображение
            </h5>
            <div className={classNames(cls.Plus)}>
              <Plus/>
            </div>
          </header>
          <input className={classNames(cls.SettingsCanvas__input)} type="color" placeholder="" />
        </section>
        <section className={classNames(cls.Section, cls.SettingsCanvas__section, cls.SettingsCanvas__backgroundFill)}>
          <header className={classNames(cls.Section__header)} style={{ marginBottom: '8px' }}>
            <h5 className={classNames(cls.Section__title)}>
              Фоновая заливка
            </h5>
            <div className={classNames(cls.Plus)}>
              <Plus/>
            </div>
          </header>
          <input className={classNames(cls.SettingsCanvas__input)} type="color" placeholder="" />
        </section>
      </div>
    </div>
  );
};
