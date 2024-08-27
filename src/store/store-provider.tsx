'use client';

import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { type AppStore, makeStore } from './store';

export function StoreProvider({ children }: { children: ReactNode }): ReactNode {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
