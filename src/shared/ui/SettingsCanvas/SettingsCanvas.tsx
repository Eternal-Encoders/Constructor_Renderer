import Plus from 'assets/Plus.svg?react';
import classNames from "classnames";
import { getBackgroundHEXCode } from 'entities/Background/model/selectors/getBackgroundHEXCode/getBackgroundHEXCode';
import { getBackgroundOpacity } from 'entities/Background/model/selectors/getBackgroundOpacity/getBackgroundOpacity';
// eslint-disable-next-line @stylistic/js/max-len
import { getBackgroundVisibility } from 'entities/Background/model/selectors/getBackgroundVisibility/getBackgroundVisibility';
import { getImageName } from 'entities/Image/model/selectors/getImageName/getImageName';
import { getImageOpacity } from 'entities/Image/model/selectors/getImageOpacity/getImageOpacity';
import { getImageSrc } from 'entities/Image/model/selectors/getImageSrc/getImageSrc';
import { getImageVisibility } from 'entities/Image/model/selectors/getImageVisibility/getImageVisibility';
import { ImageUploader } from 'entities/Image/ui/ImageUploader';
import { useSelector } from 'react-redux';
import { OpacitySettings } from '../OpacitySettings/OpacitySettings';
import cls from "./SettingsCanvas.module.scss";

interface ISettingsCanvasProps {
  className?: string;
}

export const SettingsCanvas = ({ className }: ISettingsCanvasProps) => {
  const imageSrc = useSelector(getImageSrc);
  const imageIsOpened = useSelector(getImageVisibility);
  const imageName = useSelector(getImageName);
  const imageOpacity = useSelector(getImageOpacity);

  const backgroundIsOpened = useSelector(getBackgroundVisibility);
  const backgroundHEXCode = useSelector(getBackgroundHEXCode);
  const backgroundOpacity = useSelector(getBackgroundOpacity);

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
            <div className={classNames(cls.Section__content)}>
              <ImageUploader 
                className={classNames(cls.Section__input, cls.Section__input_file)} 
                children={<Plus/>}
              />
            </div>
          </header>
          {imageSrc &&
          <OpacitySettings 
            src={imageSrc} 
            isOpened={imageIsOpened} 
            name={imageName} 
            opacity={imageOpacity}
          />
          }
        </section>
        <section className={classNames(cls.Section, cls.SettingsCanvas__section, cls.SettingsCanvas__backgroundFill)}>
          <header 
            className={classNames(cls.Section__header, cls.Section__header_background)} 
            style={{ marginBottom: '8px' }}>
            <h5 className={classNames(cls.Section__title)}>
              Фоновая заливка
            </h5>
          </header>
          <OpacitySettings 
            isOpened={backgroundIsOpened} 
            name={backgroundHEXCode} 
            opacity={backgroundOpacity}
            isToggleRemovable={false}
            isToggleVisible={false}
            isToggleOpacity={false}
            isContentFullSize
          />
        </section>
      </div>
    </div>
  );
};
