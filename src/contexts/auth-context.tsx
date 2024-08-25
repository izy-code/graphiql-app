'use client';

import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

import { RoutePath } from '@/common/enums';
import { auth, logOut } from '@/firebase/firebase';

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setUser(null);
      setLoading(false);
    }

    return auth.onIdTokenChanged(async (userParameter) => {
      if (!userParameter) {
        setUser(null);
        setLoading(false);
      } else {
        setUser(user);
        setLoading(false);

        const token = await userParameter.getIdTokenResult();
        const expirationTime = new Date(token.expirationTime);
        const currentTime = new Date();

        if (currentTime >= expirationTime) {
          await logOut();
          router.push(RoutePath.MAIN);
        }
      }
    });
  }, [router, user]);

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value}>{loading ? <h1>Loading Firebase...</h1> : children}</AuthContext.Provider>;
}
