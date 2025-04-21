import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { backgroundReducer } from 'entities/Background';
import { counterReducer } from 'entities/Counter';
import { imageReducer } from 'entities/Image';
import { layoutReducer } from 'entities/Layout';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {

  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    image: imageReducer,
    background: backgroundReducer,
    layout: layoutReducer
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: import.meta.env.VITE_IS_DEV,
    preloadedState: initialState
  })
}