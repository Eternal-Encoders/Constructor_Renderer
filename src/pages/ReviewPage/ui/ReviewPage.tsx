import { useAppDispatch } from 'app/providers/StoreProvider/lib/hooks/useAppDispatch';
import Settings from 'assets/Settings.svg?react';
import classNames from 'classnames';
import { buildingsSummaryReducer, fetchBuildingsSummary, getBuildingsSummary } from 'entities/BuildingsSummary';
import { getProjectId } from 'entities/Project';
import { fetchProjectsSummary, getProjectsSummary, projectsSummaryReducer } from 'entities/ProjectsSummary';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ButtonText } from 'shared/ui/ButtonText/ButtonText';
import { CardCommercial } from 'shared/ui/CardCommercial/CardCommercial';
import { CardWide } from 'shared/ui/CardWide/CardWide';
import { Loader } from 'shared/ui/Loader/Loader';
import { StatusActive } from 'shared/ui/StatusActive/StatusActive';
import { StatusDisable } from 'shared/ui/StatusDisable/StatusDisable';
import { TextTheme } from 'shared/ui/Text/Text';
import { ECategoryModule } from '../types/ECategoryModule';
import cls from './ReviewPage.module.scss';

const initialReducers: ReducersList = {
  'getProjectsSummary': projectsSummaryReducer,
  'getBuildingsSummary': buildingsSummaryReducer,
}

const ReviewPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoadedProjects, setIsLoadedProjects] = useState<boolean>(false);
  const [isLoadedBuildings, setIsLoadedBuildings] = useState<boolean>(false);
  const projectsSummary = useSelector(getProjectsSummary);
  const buildingsSummary = useSelector(getBuildingsSummary);
  const projectId = useSelector(getProjectId);

  const constructorIcon = () => <div style={{color: 'white'}}>🔧</div>;

  useEffect(() => {
    (async () => {
      setIsLoadedProjects(true);
      const result = await dispatch(fetchProjectsSummary());
      if (result.meta.requestStatus === 'fulfilled') {
        setIsLoadedProjects(false);
      }
    })()
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!projectId) return;
      setIsLoadedBuildings(true);
      const result = await dispatch(fetchBuildingsSummary(projectId));
      if (result.meta.requestStatus === 'fulfilled') {
        setIsLoadedBuildings(false);
      }
    })()
  }, [dispatch, projectId]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      {projectsSummary?.projects?.length ? (
        <div className={cls.ReviewPage}>
          <ul role='list' className={cls.ReviewPage__list} style={{ marginRight: 16 }}>
            <ButtonText
              onClick={() => navigate(RoutePath.building_selection)}
              size='small'
              type='fill'
              theme={TextTheme.INVERTED}
              iconLeft={constructorIcon()}
              style={{
                width: '100%',
                marginBottom: 12,
                boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
              }}
            >
              В конструктор
            </ButtonText>
            <li className={classNames(cls.Continuework)} style={{ marginBottom: 16 }}>
              <h5 className={classNames(cls.Continuework__title, cls.title)}>Продолжить работу со зданием &#9432;</h5>
              <ul role='list' className={cls.microCard}>
                {isLoadedBuildings && (
                  <li
                    className={cls.microCard__item}
                  >
                    <Loader/>
                  </li>
                )}
                {!isLoadedBuildings && buildingsSummary?.buildings && (buildingsSummary?.buildings?.length <= 0) ? (
                  <li
                    className={classNames(cls.microCard__item, cls.microCard__item_create)}
                    style={{ marginRight: 8 }}
                    onClick={() => navigate(RoutePath.building_selection)}
                  >
                    <h6
                      className={cls.microCard__create}
                    >
                      Добавить здание
                    </h6>
                  </li>)  : (
                  buildingsSummary?.buildings?.map((building) => (
                    <li className={cls.microCard__item} style={{ marginRight: 8 }} key={building.id}>
                      <h6 className={cls.microCard__title}>{building.name}</h6>
                      <span className={cls.microCard__description}>
                        <div>{new Date(building.updated_at).toLocaleDateString()}</div>
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </li>
            {isLoadedBuildings && (
              <li className={classNames(cls.Status)}>
                <h5 className={classNames(cls.Status__title, cls.title)}>Статус</h5>
                <ul role='list' className={cls.Status__list}>
                  <Loader/>
                </ul>
              </li>)}
            {!isLoadedBuildings && buildingsSummary?.buildings && (buildingsSummary?.buildings?.length > 0) && (
              <li className={classNames(cls.Status)}>
                <h5 className={classNames(cls.Status__title, cls.title)}>Статус</h5>
                <ul role='list' className={cls.Status__list}>
                  {buildingsSummary?.buildings?.map((building) => (
                    <li className={cls.Status__item} style={{ marginBottom: 8 }} key={building.id}>
                      <h6 className={cls.Status__itemTitle}>{building.name}</h6>
                      {building.status ? 
                        <StatusActive/> :   
                        <StatusDisable/>}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          <ul role='list' className={cls.ReviewPage__list} style={{ marginRight: 16 }}>
            <li style={{ marginBottom: 12 }}>
              <CardWide
                date={new Date()}
                isGreen={true}
                stonksValue={300}
                numberValue={998}
                percentValue={30}
                title="Просмотры" />
            </li>
            <li>
              <CardWide
                date={new Date()}
                isGreen={true}
                stonksValue={20}
                numberValue={599}
                percentValue={11}
                title="Новые клиенты" />
            </li>
          </ul><ul role='list' className={cls.ReviewPage__list} style={{ marginRight: 16 }}>
            <li style={{ marginBottom: 12 }}>
              <CardWide
                date={new Date()}
                isGreen={true}
                stonksValue={20}
                numberValue={1300}
                percentValue={50}
                title="Посетители" />
            </li>
            <li>
              <CardWide
                date={new Date()}
                isGreen={false}
                stonksValue={24}
                numberValue={501}
                percentValue={12}
                title="Старые клиенты" />
            </li>
          </ul><ul role='list' className={cls.ReviewPage__list}>
            <ButtonText
              onClick={() => navigate(RoutePath.modules)}
              size='small'
              type='fill'
              theme={TextTheme.INVERTED}
              iconLeft={<Settings fill="white" />}
              style={{
                width: '100%',
                marginBottom: 12,
                boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
              }}
            >
              Управление модулями
            </ButtonText>
            <li style={{ marginBottom: 12 }}>
              <CardCommercial
                category={ECategoryModule.AI}
                title="Распознавание чертежей"
                description="Автоматическое распознавание чертежей&nbsp;БТИ "
                priceValue={8000}
                color={'#3974AA'}
                background={'rgba(57, 116, 170, 0.20)'}
                imgSrc={'/scheme.png'} />
            </li>
            <li style={{ marginBottom: 12 }}>
              <CardCommercial
                category={ECategoryModule.TYPOGRAPHY}
                title="Экспорт карты в изображение"
                description="Экспорт карт из «Конструктора» в&nbsp;форматы SVG, PNG, JPEG"
                priceValue={3200}
                color={'#E88F00'}
                background={'rgba(232, 143, 0, 0.20)'}
                imgSrc={'/loupe.png'} />
            </li>
            <li style={{ marginBottom: 12 }}>
              <CardCommercial
                category={ECategoryModule.TECHNICAL}
                title="Доступ к API"
                description="Доступ к API сервиса"
                priceValue={3000}
                color={'#549800'}
                background={'rgba(84, 152, 0, 0.20)'}
                imgSrc={'/settings.png'} />
            </li>
            <li>
              <CardCommercial
                category={ECategoryModule.AI}
                title="Автопостроение графов"
                description="Автоматическое построение маршрутных&nbsp;графов"
                priceValue={5000}
                color={'#3974AA'}
                background={'rgba(57, 116, 170, 0.20)'}
                imgSrc={'/scheme.png'} />
            </li>
          </ul>
        </div>
      ) : !isLoadedProjects  && (
        <div className={classNames(cls.ReviewPage, cls.ReviewPage_centered)}>
          <ButtonText 
            onClick={() => navigate(RoutePath.project_selection)}
            size='medium' 
            type='fill' 
            theme={TextTheme.INVERTED} 
            style={{
              width: '25%', 
              flexShrink: 0,
              boxShadow: '0px 0px 10px 0px rgba(50, 69, 100, 0.10)'
            }}
          >
            Создать проект
          </ButtonText>
        </div>
      )}
    </DynamicModuleLoader>
  );     
};
      
export default ReviewPage;