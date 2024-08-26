'use client';

import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { RoutePath } from '@/common/enums';
import { auth, logOut } from '@/firebase/firebase';

const FIREBASE_ID_TOKEN_EXPIRATION_TIME_MS = 60 * 60 * 1000;

export interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (userParameter) => {
      if (!userParameter) {
        setUser(null);
        setIsLoading(false);
      } else {
        setUser(userParameter);
        setIsLoading(false);

        const { lastSignInTime } = userParameter.metadata;
        const expirationTime = new Date(lastSignInTime!);
        expirationTime.setTime(expirationTime.getTime() + FIREBASE_ID_TOKEN_EXPIRATION_TIME_MS);
        const currentTime = new Date();

        if (currentTime >= expirationTime) {
          await logOut();
          router.push(RoutePath.MAIN);
          toast.info('Your token has expired, please sign in again.');
        }
      }
    });

    return (): void => unsubscribe();
  }, [router, user]);

  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>{isLoading ? <h1>Loading Firebase...</h1> : children}</AuthContext.Provider>
  );
}
