import { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { FillSchema } from "entities/Fill";
import { FloorSchema } from "entities/Floors/model/types/floorSchema";
import { ImageSchema } from "entities/Image";
import { LayerSchema } from "entities/Layers";
import { LayoutSchema } from "entities/Layout";
import { NavigationSchema } from "entities/Navigation";
import { UserSchema } from "entities/User";
import { AddFloorSchema } from "features/AddFloor";
import { LoginSchema } from "features/AuthByMail";
import { RegisterSchema } from "features/RegisterByMail";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  fill: FillSchema;
  image: ImageSchema;
  layout: LayoutSchema;
  layers: LayerSchema;
  floors: FloorSchema[];
  navigation: NavigationSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema | undefined; 
  registerForm?: RegisterSchema | undefined; 
  addFloorForm?: AddFloorSchema | undefined; 
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