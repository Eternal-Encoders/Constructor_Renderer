import { FC, lazy } from 'react';
import { IAddProjectFormProps } from './AddProjectForm';

export const AddProjectFormAsync = lazy<FC<IAddProjectFormProps>>(() => import('./AddProjectForm'));