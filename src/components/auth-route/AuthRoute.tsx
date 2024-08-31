'use client';

import { useRouter } from 'next/navigation';
import { type ElementType, type ReactNode, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { Loader } from '../loader/Loader';

export const AuthRoute = (WrappedComponent: ElementType, isNonAuth = false) =>
  function WithAuthControl(props: object): ReactNode {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if ((isNonAuth && user) || (!isNonAuth && !user)) {
        router.push('/');
      }
    }, [user, router]);

    return (isNonAuth && !user) || (!isNonAuth && user) ? (
      <WrappedComponent {...props} />
    ) : (
      <Loader loaderText="Redirecting..." />
    );
  };
