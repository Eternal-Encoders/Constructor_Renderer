import { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit";
import { BuildingSchema } from "entities/Building";
import { BuildingSummarySchema } from "entities/BuildingsSummary";
import { CounterSchema } from "entities/Counter";
import { FillSchema } from "entities/Fill";
import { FloorSchema } from "entities/Floor";
import { FloorSummarySchema } from "entities/FloorsSummary";
import { ImageSchema } from "entities/Image";
import { LayerSchema } from "entities/Layers";
import { LayoutSchema } from "entities/Layout";
import { NavigationSchema } from "entities/Navigation";
import { ProjectSchema } from "entities/Project";
import { ProjectSummarySchema } from "entities/ProjectsSummary";
import { UserSchema } from "entities/User";
import { AddBuildingSchema } from "features/AddBuilding";
import { AddFloorSchema } from "features/AddFloor";
import { AddProjectSchema } from "features/AddProject";
import { LoginSchema } from "features/AuthByMail";
import { EditFloorSchema } from "features/EditFloor";
import { RegisterSchema } from "features/RegisterByMail";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  fill: FillSchema;
  image: ImageSchema;
  layout: LayoutSchema;
  layers: LayerSchema;
  navigation: NavigationSchema;
  project: ProjectSchema;
  building: BuildingSchema;
  floor: FloorSchema;
  
  // Асинхронные редюсеры
  loginForm?: LoginSchema | undefined; 
  registerForm?: RegisterSchema | undefined; 
  addFloorForm?: AddFloorSchema | undefined; 
  addProjectForm?: AddProjectSchema | undefined; 
  addBuildingForm?: AddBuildingSchema | undefined; 
  editFloorForm?: EditFloorSchema | undefined; 
  getProjectsSummary?: ProjectSummarySchema | undefined;
  getBuildingsSummary?: BuildingSummarySchema | undefined;
  getFloorsSummary?: FloorSummarySchema | undefined;
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