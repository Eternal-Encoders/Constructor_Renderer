import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import {
  getBuilding,
  getPatchedBuildingIsLoading
} from "entities/Building";
import {
  buildingsSummaryReducer,
  fetchBuildingsSummary,
  getBuildingsSummary,
  getBuildingsSummaryError,
} from "entities/BuildingsSummary";
import { BuildingSummary } from "entities/BuildingsSummary/model/types/buildingsSummary";
import { getProjectId } from "entities/Project";
import { AddBuildingModal } from "features/AddBuilding";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Card } from "shared/ui/Card/Card";
import { ListedItem } from "shared/ui/ListedItem/ListedItem";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { fetchBuilding } from "../../api/fetchBuilding/fetchBuilding";
import cls from "./BuildingSelection.module.scss";

interface IBuildingSelectionProps {
  className?: string;
}

const initialReducers: ReducersList = {
  'getBuildingsSummary': buildingsSummaryReducer
}

export const BuildingSelection = ({ className }: IBuildingSelectionProps) => {  
  const [isAddBuildingModal, setIsAddBuildingModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  
  const dispatch = useAppDispatch();
  const projectId = useSelector(getProjectId);
  const buildingsSummary = useSelector(getBuildingsSummary);
  const buildingInfo = useSelector(getBuilding);
  
  // const isLoadingBuildingsSummary = useSelector(getBuildingsSummaryIsLoading);
  const errorBuildingsSummary = useSelector(getBuildingsSummaryError);
  const isLoadingPatchedBuilding = useSelector(getPatchedBuildingIsLoading);
  
  const onCloseModal = useCallback(() => {
    setIsAddBuildingModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAddBuildingModal(true);
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoaded(true);
      const result = await dispatch(fetchBuildingsSummary(projectId));
      if (result.meta.requestStatus === 'fulfilled') {
        setIsLoaded(false);
      }
    })()
  }, [dispatch, projectId]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchBuildingsSummary(projectId));
    })()
  }, [dispatch, isLoadingPatchedBuilding, projectId]);

  const onClickHandle = useCallback(
    async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, building: BuildingSummary) => {
      setSelectedItem(building.id);
      if (buildingInfo.id === building.id) return;
      await dispatch(fetchBuilding(building.id));
    }, [dispatch, buildingInfo.id]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.BuildingSelection, {}, [className])}>
        <Card 
          title="Выбор здания" 
          style={{marginRight: '8px'}} 
          buttonTitle="Добавить здание" 
          buttonTitleIcon='+'
          onClickButtonTitle={onShowModal}
        >
          <ul role="list" className={classNames(cls.Card__list)} style={{padding: '8px 12px'}}>
            {errorBuildingsSummary && 
              <Text text={errorBuildingsSummary} theme={TextTheme.ERROR} className={cls.error}/>}
            {!isLoaded && buildingsSummary 
              ? buildingsSummary.buildings?.map((building) => {
                return (
                  <ListedItem 
                    key={building.id}
                    onClick={(e) => onClickHandle(e, building)}
                    style={{width: '100%', marginBottom: '8px', cursor: 'pointer'}} 
                    selected={selectedItem === building.id}
                    disabled={isLoaded}
                  >
                    {building.name}
                  </ListedItem>
                );
              }) 
              : 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div><Skeleton width={334} height={36}/> </div> 
                <div><Skeleton width={334} height={36}/> </div> 
              </div> 
            }
            {!isLoaded && !buildingsSummary?.buildings?.length && 
            <Text 
              text={'У вас пока нет зданий'} 
              theme={TextTheme.PRIMARY} 
            />}
          </ul>
        </Card>
        {isAddBuildingModal && <AddBuildingModal 
          isOpen={isAddBuildingModal}
          onClose={onCloseModal}
        />}
      </div>
    </DynamicModuleLoader>
  );
};