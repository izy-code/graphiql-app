import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useScopedI18n } from '@/locales/client';

import { Loader } from '../loader/Loader';

export const AuthRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  isNonAuth = false,
): React.FC<P> => {
  function WithAuthControl(props: P): ReactNode {
    const user = useAuth();
    const router = useRouter();
    const translate = useScopedI18n('auth');

    useEffect(() => {
      if ((isNonAuth && user && user.displayName) || (!isNonAuth && !user)) {
        router.push('/');
      }
    }, [user, router]);

    return (isNonAuth && !user) || (!isNonAuth && user && user.displayName) ? (
      <WrappedComponent {...props} />
    ) : (
      <Loader loaderText={translate('redirect')} />
    );
  }

  return WithAuthControl;
};
