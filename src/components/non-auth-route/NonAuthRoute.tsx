'use client';

import { redirect } from 'next/navigation';
import { type ElementType, type ReactNode, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

export const NonAuthRoute = (WrappedComponent: ElementType) =>
  function WithoutAuth(props: object): ReactNode {
    const { user } = useAuth();

    useEffect(() => {
      if (user) {
        redirect('/');
      }
    }, [user]);

    return user ? null : <WrappedComponent {...props} />;
  };
