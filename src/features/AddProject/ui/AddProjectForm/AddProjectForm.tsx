import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getAddProjectDescription } from "../../model/selectors/getAddProjectDescription/getAddProjectDescription";
import { getAddProjectError } from "../../model/selectors/getAddProjectError/getAddProjectError";
import { getAddProjectIsLoading } from "../../model/selectors/getAddProjectIsLoading/getAddProjectIsLoading";
import { getAddProjectName } from "../../model/selectors/getAddProjectName/getAddProjectName";
import { getAddProjectURL } from "../../model/selectors/getAddProjectURL/getAddProjectURL";
import { addProject } from "../../model/services/addProject/addProject";
import { addProjectActions, addProjectReducer } from "../../model/slice/addProjectSlice";
import cls from "./AddProjectForm.module.scss";

export interface IAddProjectFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  'addProjectForm': addProjectReducer
}

const AddProjectForm = memo(({ className, onSuccess }: IAddProjectFormProps) => {
  const dispatch = useAppDispatch();

  const name = useSelector(getAddProjectName); 
  const url = useSelector(getAddProjectURL); 
  const description = useSelector(getAddProjectDescription); 
  const isLoading = useSelector(getAddProjectIsLoading);
  const error = useSelector(getAddProjectError);

  const onChangeName = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addProjectActions.setName(value));
  }, [dispatch]);

  const onChangeDescription = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addProjectActions.setDescription(value));
  }, [dispatch]);

  const onChangeURL = useCallback((value: string | number | File) => {
    if (typeof value !== "string") return;
    dispatch(addProjectActions.setUrl(value));
  }, [dispatch]);

  const onAddProjectClick = useCallback(async () => {
    const result = await dispatch(addProject({name, url, description }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
    // dispatch(Actions);
  }, [dispatch, name, url, description, onSuccess]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.AddProjectForm, {}, [className])}>
        <Text title= "Форма добавления проекта" />
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
          className={cls.addProjectBtn} 
          onClick={onAddProjectClick}
          disabled={isLoading}
        >
          Добавить
        </ButtonText>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddProjectForm;