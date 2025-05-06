import ArrowUpAndDown from 'assets/ArrowUpAndDown.svg?react';
import Compas from 'assets/Compas.svg?react';
import Settings from 'assets/Settings.svg?react';
import classNames from "classnames";
import { getNavigationCategory } from 'entities/Navigation';
import { navigationActions } from 'entities/Navigation/model/slice/navigationSlice';
import { ENavigationCategory, ENavigationSubCategory } from 'entities/Navigation/model/types/navigationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./BuildingHeader.module.scss";

interface IBuildingHeaderProps {
  className?: string;
}

export const BuildingHeader = ({ className }: IBuildingHeaderProps) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(getNavigationCategory);

  return (
    <div className={classNames(cls.BuildingHeader, {}, [className])}>
      <div className={classNames(cls.BuildingHeader__content)}>
        <div className={classNames(cls.BuildingHeader__leftSide)}>
          <ButtonText 
            size='medium' 
            type='default'
            iconLeft={<Compas style={{marginBottom: '2px'}}/>}
            iconRight={<ArrowUpAndDown stroke="#60636C"/>}
            style={{marginRight: 16}}
            onClick={() => dispatch(navigationActions.setSubCategory(ENavigationSubCategory.ProjectSelection))}
          >
            Уральский федеральный университет
          </ButtonText>
          <ul role="list" className={classNames(cls.BuildingHeader__list)}>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={ENavigationCategory.Review === selectedCategory}
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
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.Modules))}
              >
                Модули
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link" 
                bold={ENavigationCategory.Constructor === selectedCategory}
                onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.Constructor))}
              >
                Конструктор
              </ButtonText>
            </li>
            <li>
              <ButtonText 
                size="medium" 
                type="link"
                bold={ENavigationCategory.Privileges === selectedCategory}
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
