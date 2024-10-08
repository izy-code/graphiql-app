'use client';

import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { STORE_RESET } from '@/common/constants';
import { Loader } from '@/components/loader/Loader';
import { auth, logOut } from '@/firebase/firebase';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useScopedI18n } from '@/locales/client';
import { translateText } from '@/utils/utils';

export interface UserImpl {
  stsTokenManager: {
    expirationTime: number;
  };
}

export type AuthContextType = User | null;

const TOKEN_CHECK_INTERVAL_MS = 60 * 1000;

export const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const translate = useScopedI18n('auth');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenExpiration = async (currentUser: User): Promise<void> => {
      const userImpl = currentUser.toJSON() as UserImpl;
      const { expirationTime } = userImpl.stsTokenManager;
      const currentTime = new Date().getTime();

      if (currentTime >= expirationTime) {
        await logOut();
        dispatch({ type: STORE_RESET });
        toast.info(translateText('auth.expired'));
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
  }, [router, dispatch]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Loader loaderText={translate('loading')} /> : children}
    </AuthContext.Provider>
  );
}
