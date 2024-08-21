import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type PropsWithChildren, type ReactElement, useRef } from 'react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '@/store/store';
import { makeStore, setupStore } from '@/store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProvidersAndUser(
  ui: ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {},
): { store: AppStore; user: ReturnType<typeof userEvent.setup>; container: HTMLElement } {
  function Wrapper({ children }: PropsWithChildren): ReactElement {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
      storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
  }

  return { store, user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithUserSetup(ui: ReactElement): {
  user: ReturnType<typeof userEvent.setup>;
  container: HTMLElement;
} {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}
