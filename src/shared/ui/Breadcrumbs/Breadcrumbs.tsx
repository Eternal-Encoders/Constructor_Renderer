import classNames from "classnames";
import { getNavigationCategory } from "entities/Navigation";
import { ENavigationCategory } from "entities/Navigation/model/types/navigationSchema";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RoutePath } from "shared/config/routeConfig/routeConfig.";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Breadcrumbs.module.scss";

interface IBreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs = ({ className }: IBreadcrumbsProps) => {
  const navigate = useNavigate();
  const selectedCategory = useSelector(getNavigationCategory);

  if (selectedCategory === ENavigationCategory.Constructor) {
    return (
      <div className={classNames(cls.Breadcrumbs, {}, [className])}>
        <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
          <li>
            <ButtonText size="small" type="link">
              Проекты — обзор
            </ButtonText>
          </li>
          <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
          >
            {'>'}
          </li>
          <li>
            <ButtonText 
              size="small" 
              type="link" 
              onClick={() => navigate(RoutePath.building_selection)}
            >
              {ENavigationCategory.BuildingSelection}
            </ButtonText>
          </li>
          <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
          >
            {'>'}
          </li>
          <li>
            <ButtonText size="small" type="link">
              {selectedCategory}
            </ButtonText>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Breadcrumbs, {}, [className])}>
      <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
        <li>
          <ButtonText size="small" type="link">
            Проекты — обзор
          </ButtonText>
        </li>
        {selectedCategory && <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
        >
          {'>'}
        </li>}
        <li>
          <ButtonText size="small" type="link">
            {selectedCategory}
          </ButtonText>
        </li>
      </ul>
    </div>
  );
};
