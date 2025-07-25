import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { buildingReducer } from 'entities/Building';
import { counterReducer } from 'entities/Counter';
import { fillReducer } from 'entities/Fill';
import { floorReducer } from 'entities/Floor';
import { imageReducer } from 'entities/Image';
import { layersReducer } from 'entities/Layers';
import { layoutReducer } from 'entities/Layout';
import { projectReducer } from 'entities/Project';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(initialState?: StateSchema) {

  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    image: imageReducer,
    fill: fillReducer,
    layout: layoutReducer,
    layers: layersReducer,
    project: projectReducer,
    building: buildingReducer,
    floor: floorReducer
  }

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: import.meta.env.VITE_IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
  });

  // @ts-expect-error make one more type after
  // TODO: ts-expect-error
  store.reducerManager = reducerManager;

  return store;
}

export const store = createReduxStore()
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch