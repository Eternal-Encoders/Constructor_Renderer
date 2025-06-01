import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { getBuildingLastFloorId } from "entities/Building";
import { patchFloor } from "entities/Floor";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Save.module.scss";

interface ISaveProps {
  className?: string;
}

export const Save = ({ className }: ISaveProps) => {
  const [time, setTime] = useState(new Date().toLocaleDateString());

  const dispatch = useAppDispatch();

  const lastFloorId = useSelector(getBuildingLastFloorId);

  const onClickSaveFloorHandle = useCallback(async () => {
    if (!lastFloorId) return;
    const result = 
            await dispatch(patchFloor({floorId: lastFloorId, floor: {
              
            }}));
    if (result.meta.requestStatus === 'fulfilled') {
      setTime(new Date().toLocaleDateString());
      console.log(result.payload);
    }
  },[dispatch, lastFloorId]);

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
        onClick={onClickSaveFloorHandle}
      >
        Сохранить
      </ButtonText>
    </div>
  );
};
