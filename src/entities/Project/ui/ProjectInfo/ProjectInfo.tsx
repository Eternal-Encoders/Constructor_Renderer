import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { deleteProject } from "entities/Project/api/deleteProject/deleteProject";
import { patchProject } from "entities/Project/api/patchProject/patchProject";
import { getProjectError } from "entities/Project/model/selectors/getProjectError/getProjectError";
import { getProjectId } from "entities/Project/model/selectors/getProjectId/getProjectId";
import { getProjectIsLoading } from "entities/Project/model/selectors/getProjectIsLoading/getProjectIsLoading";
import { getProjectName } from "entities/Project/model/selectors/getProjectName/getProjectName";
import { getProjectURL } from "entities/Project/model/selectors/getProjectURL/getProjectURL";
import { projectActions } from "entities/Project/model/slice/projectSlice";
import { fetchProjectsSummary } from "entities/ProjectsSummary";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { TextArea } from "shared/ui/TextArea/TextArea";
import cls from "./ProjectInfo.module.scss";

interface IProjectInfoProps {
  className?: string;
}

export const ProjectInfo = ({ className }: IProjectInfoProps) => {
  const dispatch = useAppDispatch();
  
  const projectId = useSelector(getProjectId);
  const projectName = useSelector(getProjectName);
  const projectURL = useSelector(getProjectURL);
  const errorProjectInfo = useSelector(getProjectError);
  const isLoadingProjectInfo = useSelector(getProjectIsLoading);

  const [name, setName] = useState(projectName);
  const [url, setURL] = useState(projectURL);

  const onChangeName = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(projectActions.setName(value));
  }, [dispatch]);

  const onChangeURL = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(projectActions.setURL(value));
  }, [dispatch]);

  const onClickSaveHandle = useCallback(async () => {
    if (name !== projectName || url !== projectURL) {
      const result = await dispatch(patchProject({id: projectId, name: projectName, url: projectURL}));
      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchProjectsSummary());
        setName(projectName);
        setURL(projectURL);
      }
    }
  },[dispatch, name, projectId, projectName, projectURL, url]);

  const onClickDeleteHandle = useCallback(async () => {
    await dispatch(deleteProject(projectId));
    dispatch(projectActions.clearProject());
  },[dispatch, projectId]);

  return (
    <div className={classNames(cls.ProjectInfo, {}, [className])}>
      {isLoadingProjectInfo && <div><Skeleton width={360} card/></div>}
      {!isLoadingProjectInfo && projectId && 
      <Card title="Информация о проекте">
        <div style={{padding: '5px 12px'}}>
          {errorProjectInfo && !projectName && 
            <Text text={errorProjectInfo} theme={TextTheme.ERROR} className={cls.error}/>}
          <section className={classNames(cls.ProjectInfo__section)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              Название
            </h5>
            <Input value={projectName} onChange={onChangeName} />
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              Иконка
            </h5>
            <Input value='Компас' />
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              URL
            </h5>
            <TextArea 
              placeholder="Описание здания в пользовательском представлении"
              value={projectURL}
              onChange={onChangeURL} 
            />
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <ButtonText 
              size="medium" 
              style={{marginTop: '8px'}}
              onClick={onClickSaveHandle}
            >
              Сохранить
            </ButtonText>
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <ButtonText 
              size="medium" 
              style={{marginTop: '8px', backgroundColor: 'red', color: 'white'}}
              onClick={onClickDeleteHandle}
            >
              Удалить
            </ButtonText>
          </section>
        </div>
      </Card>}
    </div>
  );
};
