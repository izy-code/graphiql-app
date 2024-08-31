'use client';

import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Loader } from '@/components/loader/Loader';
import { auth, logOut } from '@/firebase/firebase';

export interface UserImpl {
  stsTokenManager: {
    expirationTime: number;
  };
}

export interface AuthContextType {
  user: User | null;
}

const TOKEN_CHECK_INTERVAL_MS = 60 * 1000;

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = async (currentUser: User): Promise<void> => {
      const userImpl = currentUser.toJSON() as UserImpl;
      const { expirationTime } = userImpl.stsTokenManager;
      const currentTime = new Date().getTime();

      if (currentTime >= expirationTime) {
        await logOut();
        toast.info('Your token has expired, please sign in again');
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
  }, [router]);

  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Loader loaderText="Loading Firebase..." /> : children}
    </AuthContext.Provider>
  );
}
