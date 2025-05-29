import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { fetchBuildingsSummary } from "entities/BuildingsSummary";
import { getProjectId } from "entities/Project";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RoutePath } from "shared/config/routeConfig/routeConfig.";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { deleteBuilding } from "../../api/deleteBuilding/deleteBuilding";
import { patchBuilding } from "../../api/patchBuilding/patchBuilding";
import { getBuildingError } from "../../model/selectors/getBuildingError/getBuildingError";
import { getBuildingId } from "../../model/selectors/getBuildingId/getBuildingId";
import { getBuildingIsLoading } from "../../model/selectors/getBuildingIsLoading/getBuildingIsLoading";
import { getBuildingName } from "../../model/selectors/getBuildingName/getBuildingName";
import { getBuildingURL } from "../../model/selectors/getBuildingURL/getBuildingURL";
import { buildingActions } from "../../model/slice/buildingSlice";
import cls from "./BuildingInfo.module.scss";

interface IBuildingInfoProps {
  className?: string;
}

export const BuildingInfo = ({ className }: IBuildingInfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const buildingId = useSelector(getBuildingId);
  const buildingName = useSelector(getBuildingName);
  const buildingURL = useSelector(getBuildingURL);
  const errorBuildingInfo = useSelector(getBuildingError);
  const isLoadingBuildingInfo = useSelector(getBuildingIsLoading);
  const projectId = useSelector(getProjectId);

  const [name, setName] = useState(buildingName);
  const [url, setURL] = useState(buildingURL);

  const onChangeName = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(buildingActions.setName(value));
  }, [dispatch]);

  const onChangeURL = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(buildingActions.setURL(value));
  }, [dispatch]);

  const onClickSaveHandle = useCallback(async () => {
    if (name !== buildingName || url !== buildingURL) {
      const result = 
        await dispatch(patchBuilding({buildingId, building: { name: buildingName, url: buildingURL}}));
      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchBuildingsSummary(projectId));
        setName(buildingName);
        setURL(buildingURL);
      }

    }
  },[name, buildingName, url, buildingURL, dispatch, buildingId, projectId]);

  const onClickDeleteHandle = useCallback(async () => {
    await dispatch(deleteBuilding(buildingId));
    dispatch(buildingActions.clearBuilding());
  },[dispatch, buildingId]);

  return (
    <div className={classNames(cls.BuildingInfo, {}, [className])}>
      {isLoadingBuildingInfo && <div><Skeleton width={360} card/></div>}
      {!isLoadingBuildingInfo && buildingId && 
      <div style={{display: 'flex'}}>
        <Card title="Информация о здании" style={{marginRight: 8}}>
          <div style={{padding: '5px 12px'}}>
            {errorBuildingInfo && !buildingName && 
              <Text text={errorBuildingInfo} theme={TextTheme.ERROR} className={cls.error}/>}
            <section className={classNames(cls.BuildingInfo__section)}>
              <h5 className={classNames(cls.BuildingInfo__title)}>
                Название
              </h5>
              <Input value={buildingName} onChange={onChangeName} />
            </section>
            <section className={classNames(cls.BuildingInfo__section)}>
              <h5 className={classNames(cls.BuildingInfo__title)}>
                Иконка
              </h5>
              <Input value='Компас' />
            </section>
            <section className={classNames(cls.BuildingInfo__section)}>
              <h5 className={classNames(cls.BuildingInfo__title)}>
                URL
              </h5>
              <TextArea 
                placeholder="Описание здания в пользовательском представлении"
                value={buildingURL}
                onChange={onChangeURL} 
              />
            </section>
            <section className={classNames(cls.BuildingInfo__section)}>
              <ButtonText 
                size="medium" 
                style={{marginTop: '8px'}}
                onClick={onClickSaveHandle}
              >
                Сохранить
              </ButtonText>
            </section>
          </div>
        </Card>
        <Card 
          title="Управление" 
          buttonTitle="Перейти в редактор"
          buttonTitlePreIcon='⚒'
          onClickButtonTitle={() => navigate(RoutePath.constructor)}
        >
          <div style={{padding: '5px 12px'}}>
            <section className={classNames(cls.BuildingInfo__section)}>
              <ButtonText 
                size="medium" 
                style={{marginTop: 'auto', backgroundColor: 'red', color: 'white'}}
                onClick={onClickDeleteHandle}
              >
                Удалить
              </ButtonText>
            </section>
          </div>
        </Card>
      </div>}
    </div>
  );
};