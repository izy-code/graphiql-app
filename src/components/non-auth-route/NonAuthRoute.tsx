'use client';

import { redirect } from 'next/navigation';
import { type ElementType, type ReactNode, useEffect } from 'react';

import { useAuth } from '@/store/authSlice';

export const NonAuthRoute = (WrappedComponent: ElementType) =>
  function WithoutAuth(props: object): ReactNode {
    const isAuthenticated = useAuth();

    useEffect(() => {
      if (isAuthenticated) {
        redirect('/');
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
