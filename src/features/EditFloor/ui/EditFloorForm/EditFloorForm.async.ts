import { FC, lazy } from 'react';
import { IEditFloorFormProps } from './EditFloorForm';

export const EditFloorFormAsync = lazy<FC<IEditFloorFormProps>>(() => import('./EditFloorForm'));