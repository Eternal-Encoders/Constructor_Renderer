import classNames from "classnames";
import { getNavigationCategory } from "entities/Navigation";
import { navigationActions } from "entities/Navigation/model/slice/navigationSlice";
import { ENavigationCategory } from "entities/Navigation/model/types/navigationSchema";
import { useDispatch, useSelector } from "react-redux";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Breadcrumbs.module.scss";

interface IBreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs = ({ className }: IBreadcrumbsProps) => {
  const dispatch = useDispatch();
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
              onClick={() => dispatch(navigationActions.setCategory(ENavigationCategory.BuildingSelection))}
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
