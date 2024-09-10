'use client';

import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Loader } from '@/components/loader/Loader';
import { auth, logOut } from '@/firebase/firebase';
import { useScopedI18n } from '@/locales/client';

export interface UserImpl {
  stsTokenManager: {
    expirationTime: number;
  };
}

export type AuthContextType = User | null;

export interface ErrorsFirebase {
  USER_DISABLED: string;
  INVALID_LOGIN_CREDENTIALS: string;
  EMAIL_EXISTS: string;
  TOO_MANY_ATTEMPTS_TRY_LATER: string;
}

const TOKEN_CHECK_INTERVAL_MS = 60 * 1000;

export const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const translate = useScopedI18n('auth');
  const translateFirebase = useScopedI18n('firebase');
  const errors: ErrorsFirebase = useMemo(
    () => ({
      USER_DISABLED: translateFirebase('errors.USER_DISABLED'),
      INVALID_LOGIN_CREDENTIALS: translateFirebase('errors.INVALID_LOGIN_CREDENTIALS'),
      EMAIL_EXISTS: translateFirebase('errors.EMAIL_EXISTS'),
      TOO_MANY_ATTEMPTS_TRY_LATER: translateFirebase('errors.TOO_MANY_ATTEMPTS_TRY_LATER'),
    }),
    [translateFirebase],
  );

  useEffect(() => {
    const checkTokenExpiration = async (currentUser: User): Promise<void> => {
      const userImpl = currentUser.toJSON() as UserImpl;
      const { expirationTime } = userImpl.stsTokenManager;
      const currentTime = new Date().getTime();

      if (currentTime >= expirationTime) {
        await logOut(translateFirebase('sign-out.success'), errors);
        toast.info(translate('expired'));
        router.push('/');
      }
    };

    const unsubscribe = auth.onIdTokenChanged(async (changedUser) => {
      setUser(changedUser);
      setIsLoading(false);

      if (changedUser) {
        await checkTokenExpiration(changedUser);
      }
    });

    const intervalId = setInterval(async () => {
      if (auth.currentUser) {
        await checkTokenExpiration(auth.currentUser);
      }
    }, TOKEN_CHECK_INTERVAL_MS);

    return (): void => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, [router, translate, translateFirebase, errors]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Loader loaderText={translate('loading')} /> : children}
    </AuthContext.Provider>
  );
}
