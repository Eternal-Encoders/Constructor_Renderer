import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { backgroundReducer } from 'entities/Background';
import { counterReducer } from 'entities/Counter';
import { imageReducer } from 'entities/Image';
import { layersReducer } from 'entities/Layers';
import { layoutReducer } from 'entities/Layout';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {

  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    image: imageReducer,
    background: backgroundReducer,
    layout: layoutReducer,
    layers: layersReducer,
    loginForm: loginReducer,
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: import.meta.env.VITE_IS_DEV,
    preloadedState: initialState
  })
}

export const store = createReduxStore()
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch