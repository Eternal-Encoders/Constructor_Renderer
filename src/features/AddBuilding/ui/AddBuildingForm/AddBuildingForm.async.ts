import { FC, lazy } from 'react';
import { IAddBuildingFormProps } from './AddBuildingForm';

export const AddBuildingFormAsync = lazy<FC<IAddBuildingFormProps>>(() => import('./AddBuildingForm'));