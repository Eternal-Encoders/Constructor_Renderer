import Plus from 'assets/Plus.svg?react';
import classNames from "classnames";
import { ImageUploader } from 'entities/Image/ui/ImageUploader';
import { Input } from '../Input/Input';
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
          <ImageUploader className={classNames(cls.Section__input)}/>
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
          <Input type="color" placeholder=""  className={classNames(cls.Section__input)}/>
        </section>
      </div>
    </div>
  );
};
