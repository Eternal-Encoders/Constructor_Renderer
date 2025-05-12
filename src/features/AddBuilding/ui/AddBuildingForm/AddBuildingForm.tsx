import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { getProjectId } from "entities/Project";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
// eslint-disable-next-line @stylistic/js/max-len
import { getAddBuildingDisplayableName } from "../..//model/selectors/getAddBuildingDisplayableName/getAddBuildingDisplayableName";
import { getAddBuildingLatitude } from "../..//model/selectors/getAddBuildingLatitude/getAddBuildingLatitude";
import { getAddBuildingLongitude } from "../..//model/selectors/getAddBuildingLongitude/getAddBuildingLongitude";
import { getAddBuildingDescription } from "../../model/selectors/getAddBuildingDescription/getAddBuildingDescription";
import { getAddBuildingError } from "../../model/selectors/getAddBuildingError/getAddBuildingError";
import { getAddBuildingIsLoading } from "../../model/selectors/getAddBuildingIsLoading/getAddBuildingIsLoading";
import { getAddBuildingName } from "../../model/selectors/getAddBuildingName/getAddBuildingName";
import { getAddBuildingURL } from "../../model/selectors/getAddBuildingURL/getAddBuildingURL";
import { addBuilding } from "../../model/services/addBuilding/addBuilding";
import { addBuildingActions, addBuildingReducer } from "../../model/slice/addBuildingSlice";
import cls from "./AddBuildingForm.module.scss";

export interface IAddBuildingFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  'addBuildingForm': addBuildingReducer
}

const AddBuildingForm = memo(({ className, onSuccess }: IAddBuildingFormProps) => {
  const dispatch = useAppDispatch();

  const name = useSelector(getAddBuildingName); 
  const displayable_name = useSelector(getAddBuildingDisplayableName); 
  const latitude = useSelector(getAddBuildingLatitude); 
  const longitude = useSelector(getAddBuildingLongitude); 
  const url = useSelector(getAddBuildingURL); 
  const description = useSelector(getAddBuildingDescription); 
  const isLoading = useSelector(getAddBuildingIsLoading);
  const error = useSelector(getAddBuildingError);

  const project_id = useSelector(getProjectId);

  const onChangeName = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addBuildingActions.setName(value));
    dispatch(addBuildingActions.setDisplayableName(value));
  }, [dispatch]);

  const onChangeDescription = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addBuildingActions.setDescription(value));
  }, [dispatch]);

  const onChangeURL = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addBuildingActions.setUrl(value));
  }, [dispatch]);

  const onAddBuildingClick = useCallback(async () => {
    const result = 
      await dispatch(addBuilding({name, url, description, displayable_name, latitude, longitude, project_id }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, name, url, description, displayable_name, latitude, longitude, project_id, onSuccess]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.AddBuildingForm, {}, [className])}>
        <Text title= "Форма добавления здания" className={cls.title} />
        {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
        <Input 
          onChange={onChangeName} 
          value={name}
          type="name" 
          placeholder="Введите название"
          className={cls.input}/>
        <Input 
          onChange={onChangeDescription} 
          value={description}
          type="description" 
          placeholder="Введите описание"
          className={cls.input}/>
        <Input 
          onChange={onChangeURL} 
          value={url}
          type="text" 
          placeholder="Введите URL"
          className={cls.input}/>
        <ButtonText 
          className={cls.addBuildingBtn} 
          onClick={onAddBuildingClick}
          disabled={isLoading}
        >
          Добавить
        </ButtonText>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddBuildingForm;