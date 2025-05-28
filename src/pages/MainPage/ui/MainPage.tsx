import { Breadcrumbs } from "shared/ui/Breadcrumbs/Breadcrumbs";
import { BuildingHeader } from "shared/ui/BuildingHeader/BuildingHeader";
import { Navbar } from "widgets/Navbar";
import cls from './MainPage.module.scss';

interface IMainPageProps {
  children: React.ReactNode;
}

const MainPage = ({children}: IMainPageProps) => {

  return (
    <div className={cls.MainPage}>
      <Navbar className={cls.MainPage__navbar}/>
      <BuildingHeader className={cls.MainPage__building_header}/>
      <Breadcrumbs className={cls.MainPage__breadcrumbs}/>
      {children}
    </div>
  );
        
};
      
export default MainPage;