import ClosedEyeSmall from 'assets/ClosedEyeSmall.svg?react';
import OpenEyeSmall from 'assets/OpenEyeSmall.svg?react';
import classNames from "classnames";
import { FillUploader } from 'entities/Fill';
import { fillActions } from 'entities/Fill/model/slice/fillSlice';
import { imageActions } from 'entities/Image/model/slice/imageSlice';
import { getLayoutRightPanelWidth } from 'entities/Layout';
import { getShorterIfOverflow } from 'helpers/getShorterIfOverflow';
import { WheelEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import cls from "./OpacitySettings.module.scss";

interface IOpacitySettingsProps {
  className?: string;
  src?: string | null;
  isOpened: boolean;
  name: string;
  opacity: number;
  isToggleRemovable?: boolean;
  isToggleVisible?: boolean;
  isToggleOpacity?: boolean;
}

export const OpacitySettings = (props: IOpacitySettingsProps) => {
  const dispatch = useDispatch();
  const layoutRightPanelWidth = useSelector(getLayoutRightPanelWidth);

  const {
    className,
    src,
    isOpened,  
    name,
    opacity,
    isToggleRemovable = true,
    isToggleVisible = true,
    isToggleOpacity = true,
  } = props;

  const isFill = !src;
  const hexCode = !src ? name : '';

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.deltaY > 0) {
      if (opacity <= 0.05) return;
      dispatch(imageActions.setImageOpacity(opacity - 0.1));
    } else if (e.deltaY < 0) {
      if (opacity >= 0.95) return;
      dispatch(imageActions.setImageOpacity(opacity + 0.1));
    }
    return;
  }

  const clear = () => {
    dispatch(imageActions.clearImage());
  }

  const toggleVisibility = () => {
    dispatch(imageActions.setImageVisibility(!isOpened));
  }

  const convertToPercent = (value: number) => `${(value * 100).toFixed(0)}`;

  const handleNameChange = (name: string) => {
    if (layoutRightPanelWidth <= 260){
      return getShorterIfOverflow(name, 7);
    } else if (layoutRightPanelWidth <= 300){
      return getShorterIfOverflow(name, 14);
    } else if (layoutRightPanelWidth <= 340){
      return getShorterIfOverflow(name, 18);
    } 
    return getShorterIfOverflow(name, 28);
  }
    
  const handleBackgroundChange = (str: string) => {
    // Валидируем hex-код, разрешаем только # и 0-9, a-f, A-F, до 7 символов
    if (/^#?[0-9A-Fa-f]{0,6}$/.test(str.replace('#', ''))) {
      dispatch(fillActions.setFillHEXCode(str.startsWith('#') ? str : `#${str}`));
    }
  };

  return (
    <div className={classNames(cls.OpacitySettings, {}, [className])}>
      <div className={classNames(cls.OpacitySettings__opacity, cls.Opacity)}>
        <div className={classNames(cls.Opacity__preview)}>
          {src
            &&
            <img src={src} className={classNames(cls.Opacity__img)} />
          }
          {isFill
            && 
            <FillUploader children={
              <img className={classNames(cls.Opacity__img)} style={{ backgroundColor: hexCode }} 
              />
            }
            />
          }
        </div>
        <div className={classNames(cls.Opacity__text)} style={{ padding: "8px 10px 8px 4px" }}>
          <input 
            title={name}
            style={{width: '100%'}}
            type='text' 
            value={handleNameChange(name)} 
            onChange={(e) => handleBackgroundChange(e.target.value)}
          />
        </div>
        {isToggleOpacity && <div 
          className={classNames(cls.Opacity__value)}
          onWheel={(e) => onWheel(e)}
        >
          <div 
            className={classNames(cls.Number)}
          >
            {convertToPercent(opacity)}
          </div>
          <div className={classNames(cls.Percent)}>
            %
          </div>
        </div>}
      </div>
      {isToggleVisible && isToggleRemovable && <ul
        role="list"
        className={classNames(cls.OpacitySettings__actions, cls.Actions)}
        style={{ marginLeft: "4px" }}
      >
        {isToggleVisible && <li 
          className={classNames(cls.Actions__left)} 
          onClick={toggleVisibility}
        >
          <div className={classNames(cls.Eye)}>
            {isOpened ? <OpenEyeSmall fill='#60636C' /> : <ClosedEyeSmall fill='none' stroke="#60636C" />}
          </div>
        </li>}
        {isToggleRemovable && <li 
          className={classNames(cls.Actions__right)}
          onClick={clear}
        >
          <div className={classNames(cls.Delete)}>
            &ndash;
          </div>
        </li>}
      </ul>}
    </div>
  );
};


