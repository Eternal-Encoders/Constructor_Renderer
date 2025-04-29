import { combineReducers, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit";
import { ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema";

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<StateSchemaKey> = [];
  
  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema | undefined, action: UnknownAction) => {
      if (keysToRemove.length > 0 && state) {
        state = { ...state }
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = []; 
      }
      // @ts-expect-error make one more type after
      // TODO: ts-expect-error
      return combinedReducer(state, action);
    },
  
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return ;
      }
      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },
  
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return ;
      }
      delete reducers[key];
      keysToRemove.push(key);
  
      combinedReducer = combineReducers(reducers);
    }
  }
}

export type CombinedStateType = ReturnType<typeof combineReducers>;