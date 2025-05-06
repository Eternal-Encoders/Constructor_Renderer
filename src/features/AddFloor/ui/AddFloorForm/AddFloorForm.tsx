import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { getAddFloorError } from "features/AddFloor/model/selectors/getAddFloorError/getAddFloorError";
import { getAddFloorIndex } from "features/AddFloor/model/selectors/getAddFloorIndex/getAddFloorIndex";
import { getAddFloorIsLoading } from "features/AddFloor/model/selectors/getAddFloorIsLoading/getAddFloorIsLoading";
import { getAddFloorName } from "features/AddFloor/model/selectors/getAddFloorName/getAddFloorName";
import { addFloor } from "features/AddFloor/model/services/addFloor/addFloor";
import { addFloorActions, addFloorReducer } from "features/AddFloor/model/slice/addFloorSlice";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import cls from "./AddFloorForm.module.scss";

export interface IAddFloorFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  'addFloorForm': addFloorReducer
}

const AddFloorForm = memo(({ className, onSuccess }: IAddFloorFormProps) => {
  const dispatch = useAppDispatch();

  const index = useSelector(getAddFloorIndex); 
  const name = useSelector(getAddFloorName); 
  const isLoading = useSelector(getAddFloorIsLoading);
  const error = useSelector(getAddFloorError);
  const building_id = '111111111111111111111111';

  const onChangeName = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addFloorActions.setName(value));
  }, [dispatch]);

  const onChangeIndex = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    if (value[0] === '-') {
      if (+value < -100) return;
    } else {
      if (value.length > 3) return;
    }
    dispatch(addFloorActions.setIndex(+value));
  }, [dispatch]);

  const onAddFloorClick = useCallback(async () => {
    const result = await dispatch(addFloor({ building_id, index, name }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
    onSuccess();
  }, [dispatch, index, onSuccess, name]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.AddFloorForm, {}, [className])}>
        <Text title= "Форма добавления этажа" />
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
        <ButtonText 
          className={cls.addFloorBtn} 
          onClick={onAddFloorClick}
          disabled={isLoading}
        >
          Добавить
        </ButtonText>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddFloorForm;