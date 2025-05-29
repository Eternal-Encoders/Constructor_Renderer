import Compas from 'assets/Compas.svg?react';
import Settings from 'assets/Settings.svg?react';
import classNames from "classnames";
import { getPatchedProjectIsLoading, getProjectIsLoading, getProjectName } from 'entities/Project';
import { getAddProjectIsLoading } from 'features/AddProject';
import { getShorterIfOverflow } from 'helpers/getShorterIfOverflow';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.';
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./BuildingHeader.module.scss";

interface IBuildingHeaderProps {
  className?: string;
}

export const BuildingHeader = ({ className }: IBuildingHeaderProps) => {
  const navigate = useNavigate();

  const projectInfo = useSelector(getProjectName);

  const isLoadingPatchedProject = useSelector(getPatchedProjectIsLoading);
  const isLoadingProjectInfo = useSelector(getProjectIsLoading);
  const isAddProjectIsLoading = useSelector(getAddProjectIsLoading);

  const getProjectNameHandle = useCallback(() => {
    if (isLoadingPatchedProject === false || isLoadingProjectInfo === false) {
      return projectInfo;
    } else {
      return 'Проект не выбран';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPatchedProject, isLoadingProjectInfo, isAddProjectIsLoading]);
  return (
    <div className={classNames(cls.BuildingHeader, {}, [className])}>
      <div className={classNames(cls.BuildingHeader__content)}>
        <div className={classNames(cls.BuildingHeader__leftSide)}>
          <ButtonText 
            size='medium' 
            type='default'
            iconLeft={projectInfo.length > 0 && <Compas style={{marginBottom: '2px'}}/>}
            iconRight={projectInfo.length > 0 && '✓'}
            style={{marginRight: 16, width: 200}}
            onClick={() => navigate(RoutePath.project_selection)}
            iconRightStickedToTheEnd
            centered={false}
            disabled={projectInfo.length <= 0}
          >
            {projectInfo ? getShorterIfOverflow(getProjectNameHandle(), 11) : 'Проект не выбран'}
          </ButtonText>
          <ul role="list" className={classNames(cls.BuildingHeader__list)}>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={window.location.pathname === RoutePath.review}
                style={{width: '116px'}}
                onClick={() => navigate(RoutePath.review)}
              >
                Обзор
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={window.location.pathname === RoutePath.analytics}
                style={{width: '116px'}}
                onClick={() => navigate(RoutePath.analytics)}
              >
                Аналитика
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={window.location.pathname === RoutePath.modules}
                style={{width: '116px'}}
                onClick={() => navigate(RoutePath.modules)}
              >
                Модули
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link" 
                bold={window.location.pathname === RoutePath.building_selection}
                style={{width: '116px'}}
                onClick={() => navigate(RoutePath.building_selection)}
              >
                Конструктор
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={window.location.pathname === RoutePath.privileges}
                style={{width: '116px'}}
                onClick={() => navigate(RoutePath.privileges)}
              >
                Привилегии
              </ButtonText>
            </li>
          </ul>
        </div>
        <aside 
          className={classNames(cls.SettingsIcon)}
          onClick={() => console.log('settingsIcon clicked!')}
        >
          <Settings fill="#60636C"/>
        </aside>
      </div>
    </div>
  );
};
