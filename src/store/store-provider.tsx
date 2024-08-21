'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import type { AppStore } from './store';
import { makeStore } from './store';

export default function StoreProvider({ children }: { children: React.ReactNode }): ReactNode {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
