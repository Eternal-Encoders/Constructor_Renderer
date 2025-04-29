import { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { FillSchema } from "entities/Fill";
import { ImageSchema } from "entities/Image";
import { LayersSchema } from "entities/Layers";
import { LayoutSchema } from "entities/Layout";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  fill: FillSchema;
  image: ImageSchema;
  layout: LayoutSchema;
  layers: LayersSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema | undefined; 
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema | undefined, action: UnknownAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;  
}