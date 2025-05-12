import { FC, lazy } from 'react';
import { IRegisterFormProps } from './RegisterForm';

export const RegisterFormAsync = lazy<FC<IRegisterFormProps>>(() => import('./RegisterForm'));