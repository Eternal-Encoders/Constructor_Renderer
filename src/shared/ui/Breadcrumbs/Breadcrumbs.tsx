import classNames from "classnames";
import { useNavigate } from "react-router";
import { RoutePath } from "shared/config/routeConfig/routeConfig.";
import { ButtonText } from "../ButtonText/ButtonText";
import cls from "./Breadcrumbs.module.scss";

interface IBreadcrumbsProps {
  className?: string;
}

enum ENavigationCategory {
  Review = 'Проекты — обзор',
  ProjectSelection = 'Выбор проекта',
  BuildingSelection = 'Конструктор - выбор здания',
  Constructor = 'Конструктор',
  Editor = 'Редактор',
  Analytics = 'Аналитика',
  Modules = 'Модули',
  Privileges = 'Привелегии',
  None = ''
}

export const Breadcrumbs = ({ className }: IBreadcrumbsProps) => {
  const navigate = useNavigate();

  switch (window.location.pathname) {
    case RoutePath.review:
      return (          
        <div  className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ButtonText size="small" type="link" onClick={() => navigate(RoutePath.review)}>
            {ENavigationCategory.Review}
          </ButtonText>
        </div>
      );   
    case RoutePath.project_selection:
      return (          
        <div className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
            <li onClick={() => navigate(RoutePath.review)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Review}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li>
              <ButtonText size="small" type="link">
                {ENavigationCategory.ProjectSelection}
              </ButtonText>
            </li>
          </ul>
        </div>
      );
    case RoutePath.building_selection:
      return (          
        <div className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
            <li onClick={() => navigate(RoutePath.review)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Review}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li>
              <ButtonText size="small" type="link">
                {ENavigationCategory.BuildingSelection}
              </ButtonText>
            </li>
          </ul>
        </div>
      );
    case RoutePath.constructor:
      return (          
        <div className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
            <li onClick={() => navigate(RoutePath.review)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Review}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li onClick={() => navigate(RoutePath.building_selection)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.BuildingSelection}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Editor}
              </ButtonText>
            </li>
          </ul>
        </div>
      );
    case RoutePath.analytics:
      return (
        <div className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
            <li onClick={() => navigate(RoutePath.review)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Review}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Analytics}
              </ButtonText>
            </li>
          </ul>
        </div>
      );
    case RoutePath.modules:
      return (
        <div className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
            <li onClick={() => navigate(RoutePath.review)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Review}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Modules}
              </ButtonText>
            </li>
          </ul>
        </div>
      );
    case RoutePath.privileges:
      return (
        <div className={classNames(cls.Breadcrumbs, {}, [className])}>
          <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
            <li onClick={() => navigate(RoutePath.review)}>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Review}
              </ButtonText>
            </li>
            <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
            >
              {'>'}
            </li>
            <li>
              <ButtonText size="small" type="link">
                {ENavigationCategory.Privileges}
              </ButtonText>
            </li>
          </ul>
        </div>
      );
  }
};

//   if (window.location.pathname === RoutePath.review) {
//     return (
//       <div className={classNames(cls.Breadcrumbs, {}, [className])}>
//         <ul role="list" className={classNames(cls.Breadcrumbs__list)}>
//           <li>
//             <ButtonText size="small" type="link">
//               Проекты — обзор
//             </ButtonText>
//           </li>
//           <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
//           >
//             {'>'}
//           </li>
//           <li>
//             <ButtonText 
//               size="small" 
//               type="link" 
//               onClick={() => navigate(RoutePath.building_selection)}
//             >
//               {ENavigationCategory.BuildingSelection}
//             </ButtonText>
//           </li>
//           <li className={classNames(cls.Sign)} style={{marginTop: '1px'}}
//           >
//             {'>'}
//           </li>
//           <li>
//             <ButtonText size="small" type="link">
//               {selectedCategory}
//             </ButtonText>
//           </li>
//         </ul>
//       </div>
//     );
//   }

//   return (
 
//   );
// };
