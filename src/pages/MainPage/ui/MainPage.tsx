import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import { Building } from "entities/Building/ui/Building/Building";
import { getNavigationCategory } from "entities/Navigation";
import { ENavigationCategory } from "entities/Navigation/model/types/navigationSchema";
import { fetchProject } from "entities/Project";
import { Project } from "entities/Project/ui/Project/Project";
import { fetchUserInfo, FetchUserInfoResponse } from "entities/User/api/fetchUserInfo/fetchUserInfo";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Breadcrumbs } from "shared/ui/Breadcrumbs/Breadcrumbs";
import { BuildingHeader } from "shared/ui/BuildingHeader/BuildingHeader";
import { Constructor } from "shared/ui/Constructor/Constructor";
import { Navbar } from "widgets/Navbar";
import cls from './MainPage.module.scss';

const MainPage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const fetchedUserInfoResult = await dispatch(fetchUserInfo());
      if (fetchedUserInfoResult.meta.requestStatus === 'fulfilled') {
        const userPayload = fetchedUserInfoResult!.payload as FetchUserInfoResponse;;
        await dispatch(fetchProject(userPayload.selected_project_id));
      }
    })()
  }, [dispatch]);

  const selectedCategory = useSelector(getNavigationCategory);
  
  const chosenCategory = () => {
    switch (selectedCategory) {
      case ENavigationCategory.BuildingSelection:
        return (
          <Building/>
        );
      case ENavigationCategory.Constructor:
        return (
          <Constructor/>
        );
      case ENavigationCategory.ProjectSelection:
        return (
          <Project/>
        );
    }
  }

  return (
    <div className={cls.MainPage}>
      <Navbar className={cls.MainPage__navbar}/>
      <BuildingHeader className={cls.MainPage__building_header}/>
      <Breadcrumbs className={cls.MainPage__breadcrumbs}/>
      {chosenCategory()}
    </div>
  );
        
};
      
export default MainPage;