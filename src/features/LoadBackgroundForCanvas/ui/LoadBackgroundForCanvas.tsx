import Plus from "assets/Plus.svg?react";
import classNames from "classnames";
import { getFillHEXCode, getFillOpacity, getFillVisibility } from "entities/Fill";
import { getImageName, getImageOpacity, getImageSrc, getImageVisibility, ImageUploader } from "entities/Image";
import { useSelector } from "react-redux";
import { OpacitySettings } from "shared/ui/OpacitySettings/OpacitySettings";
import { Text } from "shared/ui/Text/Text";
import cls from "./LoadBackgroundForCanvas.module.scss";

interface ILoadBackgroundForCanvas {
  className?: string;
}

export const LoadBackgroundForCanvas = ({ className }: ILoadBackgroundForCanvas) => {

  const imageSrc = useSelector(getImageSrc);
  const imageIsOpened = useSelector(getImageVisibility);
  const imageName = useSelector(getImageName);
  const imageOpacity = useSelector(getImageOpacity);
  const fillIsOpened = useSelector(getFillVisibility);
  const fillHEXCode = useSelector(getFillHEXCode);
  const fillOpacity = useSelector(getFillOpacity);

  return (
    <>
      <section className={classNames(cls.Section, [className])}>
        <header className={classNames(cls.Section__header)} >
          <Text text={"Фоновое изображение"}/>
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
      <section className={classNames(cls.Section, [className])}>
        <header 
          className={classNames(cls.Section__header, cls.Section__header_background)}>
          <Text text={"Фоновая заливка"}/>
        </header>
        <OpacitySettings 
          isOpened={fillIsOpened} 
          name={fillHEXCode} 
          opacity={fillOpacity}
          isToggleRemovable={false}
          isToggleVisible={false}
          isToggleOpacity={false}
        />
      </section>
    </>
  );
};
