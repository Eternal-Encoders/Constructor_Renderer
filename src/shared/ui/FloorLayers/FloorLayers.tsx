import classNames from "classnames";
import cls from "./FloorLayers.module.scss";

interface IFloorLayersProps {
  className?: string;
}

export const FloorLayers = ({ className }: IFloorLayersProps) => {
  // const [isActive, setIsActive] = useState(true);
  // const [isFavourite, setIsFavourite] = useState(false);

  return (
    <ul className={classNames(cls.FloorLayers, {}, [className])}>
      {/* <li onClick={() => setIsActive(!isActive)} 
        className={classNames(cls.FloorLayers__item, isActive && cls.FloorLayers__item_active)}
      >
        <div className={classNames(cls.FloorLayers__leftIcon)}
          style={{marginRight: 6}}
        >
          <Compas/> 
        </div>
        <h5 className={classNames(cls.FloorLayers__title)}>
          1 Этаж
        </h5>
        <div className={classNames(cls.FloorLayers__rightIcon)} onClick={(e) => {
          e.stopPropagation();
          setIsFavourite(!isFavourite)
        }}>
          <div className={classNames(cls.FloorLayers__icon_star)}>
            <Star fill={isFavourite ? 'yellow' : 'none'} stroke={isFavourite ? 'yellow' : 'none'}/>
          </div>
        </div>
      </li>
      <li 
        className={classNames(cls.FloorLayers__item)}
      >
        <div className={classNames(cls.FloorLayers__leftIcon)}
          style={{marginRight: 6}}
        >
          <Compas/> 
        </div>
        <h5 className={classNames(cls.FloorLayers__title)}>
          2 Этаж
        </h5>
        <div className={classNames(cls.FloorLayers__rightIcon)}>
          <div className={classNames(cls.FloorLayers__icon_star)}>
            <Star/>
          </div>
        </div>
      </li> */}
    </ul>
  );
};
