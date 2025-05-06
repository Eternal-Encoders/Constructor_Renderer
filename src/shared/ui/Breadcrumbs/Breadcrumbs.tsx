import classNames from "classnames";
import { getNavigationCategory } from "entities/Navigation";
import { useSelector } from "react-redux";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Breadcrumbs.module.scss";

interface IBreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs = ({ className }: IBreadcrumbsProps) => {
  const selectedCategory = useSelector(getNavigationCategory);

  return (
    <div className={classNames(cls.Breadcrumbs, {}, [className])}>
      <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
        <li>
          <ButtonText size="small" type="link">
            Личный кабинет — обзор
          </ButtonText>
        </li>
        <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
        >
          {'>'}
        </li>
        <li>
          <ButtonText size="small" type="link">
            Конструктор — выбор здания
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
