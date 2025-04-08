import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { imageReducer } from 'entities/Image';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {

  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    image: imageReducer,
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: import.meta.env.VITE_IS_DEV,
    preloadedState: initialState
  })
}