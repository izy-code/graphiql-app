import type { Store } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSLice } from './authSlice';
import { exampleSlice } from './example/example-slice';

const rootReducer = combineReducers({ example: exampleSlice.reducer, auth: authSLice.reducer });

export function setupStore(preloadedState?: Partial<RootState>): Store<RootState> {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
