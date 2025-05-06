import { FC, lazy } from 'react';
import { IAddFloorFormProps } from './AddFloorForm';

export const AddFloorFormAsync = lazy<FC<IAddFloorFormProps>>(() => import('./AddFloorForm'));