import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { getBuildingId } from "entities/Building";
import { deleteFloor } from "entities/Floor/api/deleteFloor/deleteFloor";
import { patchFloor } from "entities/Floor/api/patchFloor/patchFloor";
import { fetchFloorsSummary } from "entities/FloorsSummary";
import { getEditFloorError } from "features/EditFloor/model/selectors/getEditFloorError/getEditFloorError";
import { getEditFloorIsLoading } from "features/EditFloor/model/selectors/getEditFloorIsLoading/getEditFloorIsLoading";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getEditFloorIndex } from "../../model/selectors/getEditFloorIndex/getEditFloorIndex";
import { getEditFloorName } from "../../model/selectors/getEditFloorName/getEditFloorName";
import { editFloorActions, editFloorReducer } from "../../model/slice/editFloorSlice";
import cls from "./EditFloorForm.module.scss";

export interface IEditFloorFormProps {
  className?: string;
  onSuccess: () => void;
  selectedFloorId: string
}

const initialReducers: ReducersList = {
  'editFloorForm': editFloorReducer
}

const EditFloorForm = memo(({ className, onSuccess, selectedFloorId }: IEditFloorFormProps) => {
  const dispatch = useAppDispatch();

  const index = useSelector(getEditFloorIndex);
  const name = useSelector(getEditFloorName);
  const error = useSelector(getEditFloorError);
  const isLoading = useSelector(getEditFloorIsLoading);

  const buildingId = useSelector(getBuildingId);

  const onChangeName = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(editFloorActions.setName(value));
  }, [dispatch]);

  const onChangeIndex = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    if (value[0] === '-') {
      if (+value < -100) return;
    } else {
      if (value.length > 3) return;
    }
    dispatch(editFloorActions.setIndex(+value));
  }, [dispatch]);

  const onEditFloorClick = useCallback(async () => {
    const result = await dispatch(patchFloor({floorId: selectedFloorId, floor: {index, name}}));
    if (result.meta.requestStatus === 'fulfilled') {
      await dispatch(fetchFloorsSummary(buildingId));
    }
    onSuccess();
  }, [buildingId, dispatch, index, name, onSuccess, selectedFloorId]);

  const onDeleteFloorClick = useCallback(async () => {
    await dispatch(deleteFloor(selectedFloorId));
    onSuccess();
  }, [dispatch, onSuccess, selectedFloorId]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.EditFloorForm, {}, [className])}>
        <Text title= "Форма изменения этажа" />
        {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
        <Input
          onChange={onChangeIndex} 
          autoFocus
          value={index.toString()}
          type="number" 
          placeholder="Введите номер этажа *"
          className={cls.input}/>
        <Input 
          onChange={onChangeName} 
          value={name}
          type="name" 
          placeholder="Введите название"
          className={cls.input}/>
        <div className={classNames(cls.buttons)}>
          <ButtonText 
            className={cls.editFloorBtn} 
            onClick={onEditFloorClick}
            disabled={isLoading}
          >
            Изменить
          </ButtonText>
          <ButtonText 
            className={cls.deleteFloorBtn} 
            onClick={onDeleteFloorClick}
            disabled={isLoading}
          >
            Удалить
          </ButtonText>
        </div>
      </div>
    </DynamicModuleLoader>
  );
});

export default EditFloorForm;