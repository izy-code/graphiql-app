import type { Store } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { USER_LOGOUT } from '@/common/constants';

import graphqlReducer from './graphql-slice/graphql-slice';

const appReducer = combineReducers({
  graphql: graphqlReducer,
});

const rootReducer: typeof appReducer = (
  state: RootState | Partial<RootState> | undefined,
  action: Parameters<typeof appReducer>[1],
): RootState => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const setupStore = (preloadedState?: Partial<RootState>): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
