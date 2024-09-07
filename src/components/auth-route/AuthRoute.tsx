import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { Loader } from '../loader/Loader';

export const AuthRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  isNonAuth = false,
): React.FC<P> => {
  function WithAuthControl(props: P): ReactNode {
    const user = useAuth();
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
  }

  return WithAuthControl;
};
