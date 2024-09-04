import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type Auth } from 'firebase/auth';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { type PropsWithChildren, type ReactElement, useRef } from 'react';
import { Provider } from 'react-redux';

import type * as FirebaseModule from '@/firebase/firebase';
import type { AppStore, RootState } from '@/store/store';
import { makeStore, setupStore } from '@/store/store';

type Callback = (changedUser: object | null) => Promise<void>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProvidersAndUser(
  ui: ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {},
): {
  store: AppStore;
  user: ReturnType<typeof userEvent.setup>;
  container: HTMLElement;
  rerender: (ui: ReactElement) => void;
} {
  function Wrapper({ children }: PropsWithChildren): ReactElement {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
      storeRef.current = makeStore();
    }

    return (
      <MemoryRouterProvider>
        <Provider store={storeRef.current}>{children}</Provider>;
      </MemoryRouterProvider>
    );
  }

  return { store, user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithUserSetup(ui: ReactElement): {
  user: ReturnType<typeof userEvent.setup>;
  container: HTMLElement;
  rerender: (ui: ReactElement) => void;
} {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}

export function firebaseMock(): void {
  let onIdTokenChangedCallback: null | Callback = vi.hoisted(() => null);

  const mockAuth = vi.hoisted(() => async (_: Auth, email: string, password: string): Promise<boolean> => {
    const mock = {
      email,
      password,
      toJSON: (): { stsTokenManager: { expirationTime: number } } => ({
        stsTokenManager: { expirationTime: new Date().getTime() },
      }),
    };

    await onIdTokenChangedCallback?.(mock);
    return true;
  });

  vi.mock('@/firebase/firebase', async (importOriginal) => {
    const actual = await importOriginal<typeof FirebaseModule>();

    return {
      ...actual,
      auth: {
        ...actual.auth,
        onIdTokenChanged: vi.fn((callback: Callback) => {
          onIdTokenChangedCallback = callback;
          void callback(null);
          return (): void => {};
        }),
      },
    };
  });

  vi.mock('firebase/auth', async () => {
    const actual = await vi.importActual('firebase/auth');

    return {
      ...actual,
      signInWithEmailAndPassword: mockAuth,
      createUserWithEmailAndPassword: mockAuth,
    };
  });
}

export function navigationMock(): void {
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');

    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(async (newUrl: string): Promise<void> => {
          await mockRouter.push(newUrl);
        }),
      })),
    };
  });
}
