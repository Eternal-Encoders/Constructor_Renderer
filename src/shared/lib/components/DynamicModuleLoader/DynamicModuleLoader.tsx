import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { FC, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

interface IDynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount: boolean;
  children: React.ReactNode;
}

export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = (props: IDynamicModuleLoaderProps) => {
  const {
    children,
    removeAfterUnmount,
    reducers,
  } = props;
  
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({type: `@INIT ${name} reducer`});
    });
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({type: `@DESTROY ${name} reducer`});
        });
      }
    }
    // eslint-disable-next-line
    }, [])

  return (<>{children}</>);
};
