import Prison from 'assets/Prison.svg?react';
import classNames from "classnames";
import { Polygon, Rectangle } from 'entities/Figure';
import { getImageName, getImageSrc } from 'entities/Image';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import cls from "./LayersItems.module.scss";

interface ILayersItemsProps {
  className?: string;
  figures: (Polygon | Rectangle)[];
  selectedId: string | null;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}

export const LayersItems = ({ className, figures, selectedId, setSelectedId }: ILayersItemsProps) => {

  const img = useSelector(getImageName);
  const imgSrc = useSelector(getImageSrc);
  
  const handleSelectLayer = (id: string) => () => {
    setSelectedId(id);
  };

  return (
    <ul className={classNames(cls.LayersItems, {}, [className])}>
      {figures && figures.sort((a, b) => 
        a.createdAt.toString().localeCompare(b.createdAt.toString()))
        .map((layer) => {
          return (
            <li 
              className={classNames(cls.LayersItems__item, {[cls.selected]: layer.id === selectedId})} 
              key={layer.id}
              onClick={handleSelectLayer(layer.id)}
            >
              <div className={classNames(cls.LayersItems__leftIcon)}>
                <Prison/>
              </div>
              <h6 className={classNames(cls.LayersItems__title)}>{layer.name}</h6>
            </li>
          );
        })}
      {imgSrc && <li 
        className={classNames(cls.LayersItems__item, {[cls.selected]: imgSrc === selectedId})} 
        key={imgSrc}
        onClick={handleSelectLayer(imgSrc)}
      >
        <div className={classNames(cls.LayersItems__leftIcon)}>
          <Prison/>
        </div>
        <h6 className={classNames(cls.LayersItems__title)}>{img}</h6>
      </li>}
    </ul>
  );
};
