import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import {
  getPatchedProjectIsLoading,
  getProject
} from "entities/Project";
import {
  fetchProjectsSummary,
  getProjectsSummary,
  getProjectsSummaryError,
  projectsSummaryReducer
} from "entities/ProjectsSummary";
import { ProjectSummary } from "entities/ProjectsSummary/model/types/projectsSummary";
import { AddProjectModal } from "features/AddProject";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Card } from "shared/ui/Card/Card";
import { ListedItem } from "shared/ui/ListedItem/ListedItem";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { fetchProject } from "../../api/fetchProject/fetchProject";
import cls from "./ProjectSelection.module.scss";

interface IProjectSelectionProps {
  className?: string;
}

const initialReducers: ReducersList = {
  'getProjectsSummary': projectsSummaryReducer
}

export const ProjectSelection = ({ className }: IProjectSelectionProps) => {  
  const [isAddProjectModal, setIsAddProjectModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  
  const dispatch = useAppDispatch();
  const projectsSummary = useSelector(getProjectsSummary);
  const projectInfo = useSelector(getProject);
  
  // const isLoadingProjectsSummary = useSelector(getProjectsSummaryIsLoading);
  const errorProjectsSummary = useSelector(getProjectsSummaryError);
  const isLoadingPatchedProject = useSelector(getPatchedProjectIsLoading);
  
  const onCloseModal = useCallback(() => {
    setIsAddProjectModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAddProjectModal(true);
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoaded(true);
      const result = await dispatch(fetchProjectsSummary());
      if (result.meta.requestStatus === 'fulfilled') {
        setIsLoaded(false);
      }
    })()
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProjectsSummary());
    })()
  }, [dispatch, isLoadingPatchedProject]);

  const onClickHandle = useCallback(
    async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: ProjectSummary) => {
      setSelectedItem(project.id);
      if (projectInfo.id === project.id) return;
      await dispatch(fetchProject(project.id));
    }, [dispatch, projectInfo.id]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.ProjectSelection, {}, [className])}>
        <Card 
          title="Выбор проекта" 
          style={{marginRight: '8px'}} 
          buttonTitle="Добавить проект" 
          buttonTitleIcon='+'
          onClickButtonTitle={onShowModal}
        >
          <ul role="list" className={classNames(cls.Card__list)} style={{padding: '8px 12px'}}>
            {errorProjectsSummary && <Text text={errorProjectsSummary} theme={TextTheme.ERROR} className={cls.error}/>}
            {!isLoaded && projectsSummary 
              ? projectsSummary.projects?.map((project) => {
                return (
                  <ListedItem 
                    key={project.id}
                    onClick={(e) => onClickHandle(e, project)}
                    style={{width: '100%', marginBottom: '8px', cursor: 'pointer'}} 
                    selected={selectedItem === project.id}
                    disabled={isLoaded}
                  >
                    {project.name}
                  </ListedItem>
                );
              }) 
              : 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div><Skeleton width={334} height={36}/> </div> 
                <div><Skeleton width={334} height={36}/> </div> 
              </div> 
            }
            {!isLoaded && !projectsSummary?.projects?.length && 
            <Text 
              text={'У вас пока нет проектов'} 
              theme={TextTheme.PRIMARY} 
            />}
          </ul>
        </Card>
        {isAddProjectModal && <AddProjectModal 
          isOpen={isAddProjectModal}
          onClose={onCloseModal}
        />}
      </div>
    </DynamicModuleLoader>
  );
};
