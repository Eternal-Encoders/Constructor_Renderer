import Compas from 'assets/Compas.svg?react';
import Settings from 'assets/Settings.svg?react';
import classNames from "classnames";
import { getNavigationCategory } from 'entities/Navigation';
import { navigationActions } from 'entities/Navigation/model/slice/navigationSlice';
import { ENavigationCategory } from 'entities/Navigation/model/types/navigationSchema';
import { getPatchedProjectIsLoading, getProjectIsLoading, getProjectName } from 'entities/Project';
import { getShorterIfOverflow } from 'helpers/getShorterIfOverflow';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./BuildingHeader.module.scss";

interface IBuildingHeaderProps {
  className?: string;
}

export const BuildingHeader = ({ className }: IBuildingHeaderProps) => {
  const dispatch = useDispatch();

  const selectedCategory = useSelector(getNavigationCategory);
  const getProjectInfo = useSelector(getProjectName);

  const isLoadingPatchedProject = useSelector(getPatchedProjectIsLoading);
  const isLoadingProjectInfo = useSelector(getProjectIsLoading);

  const getProjectNameHandle = useCallback(() => {
    if (isLoadingPatchedProject === false || isLoadingProjectInfo === false) {
      return getProjectInfo;
    } else {
      return 'Проект не выбран';
    }
  }, [getProjectInfo, isLoadingPatchedProject, isLoadingProjectInfo]);

  return (
    <div className={classNames(cls.BuildingHeader, {}, [className])}>
      <div className={classNames(cls.BuildingHeader__content)}>
        <div className={classNames(cls.BuildingHeader__leftSide)}>
          <ButtonText 
            size='medium' 
            type='default'
            iconLeft={getProjectInfo.length > 0 && <Compas style={{marginBottom: '2px'}}/>}
            iconRight={getProjectInfo.length > 0 && '✓'}
            style={{marginRight: 16, width: 200}}
            onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.ProjectSelection))}
            iconRightStickedToTheEnd
            centered={false}
            disabled={getProjectInfo.length <= 0}
          >
            {getProjectInfo ? getShorterIfOverflow(getProjectNameHandle(), 14) : 'Проект не выбран'}
          </ButtonText>
          <ul role="list" className={classNames(cls.BuildingHeader__list)}>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={ENavigationCategory.Review === selectedCategory}
                style={{width: '116px'}}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.Review))}
              >
                Обзор
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={ENavigationCategory.Analytics === selectedCategory}
                style={{width: '116px'}}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.Analytics))}
              >
                Аналитика
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={ENavigationCategory.Modules === selectedCategory}
                style={{width: '116px'}}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.Modules))}
              >
                Модули
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link" 
                bold={ENavigationCategory.BuildingSelection === selectedCategory}
                style={{width: '116px'}}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.BuildingSelection))}
              >
                Конструктор
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={ENavigationCategory.Privileges === selectedCategory}
                style={{width: '116px'}}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.Privileges))}
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
