'use client';

import { type ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from './store';

export function StoreProvider({ children }: { children: ReactNode }): ReactNode {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}
