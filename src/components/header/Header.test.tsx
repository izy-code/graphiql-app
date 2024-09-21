import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import { NonProtectedPaths } from '@/common/enums';
import { Header } from '@/components/header/Header';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

let auth = true;
const changeLocale = vi.fn((arg: string) => arg);
const translate = vi.fn((arg: string) => {
  switch (arg) {
    case 'button.sign-out':
      return 'Sign out';
    case 'links.sign-in':
      return 'Sign in';
    case 'links.sign-up':
      return 'Sign up';
    default:
      return '';
  }
});

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useCurrentLocale: vi.fn(() => 'en'),
    useChangeLocale: vi.fn(() => changeLocale),
    useScopedI18n: vi.fn(() => translate),
  };
});

vi.mock('@/firebase/firebase', () => ({
  logOut: vi.fn(() => {
    auth = !auth;
  }),
}));

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => auth) }));

describe('Header Component', () => {
  it('Link Sign up should be visible on page Sign in', async () => {
    await mockRouter.push(NonProtectedPaths.SIGN_IN);
    auth = false;
    renderWithProvidersAndUser(<Header />);

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('Link Sign in should be visible on page Sign up', async () => {
    await mockRouter.push(NonProtectedPaths.SIGN_UP);
    auth = false;
    renderWithProvidersAndUser(<Header />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });

  it('Links Sign in and Sign up should be visible when user will click on Sign out', async () => {
    auth = true;
    await mockRouter.push('/');
    const { user, rerender } = renderWithProvidersAndUser(<Header />);

    const signOut = screen.getByText(/sign out/i);

    await user.click(signOut);

    rerender(<Header />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('Link Sign in should route to Sign in page', async () => {
    auth = false;
    await mockRouter.push('/');
    const { user } = renderWithProvidersAndUser(<Header />);

    const signIn = screen.getByRole('link', { name: /sign in/i });

    await user.click(signIn);

    expect(mockRouter.asPath).toEqual(NonProtectedPaths.SIGN_IN);
  });

  it('Link Sign up should route to Sign up page', async () => {
    auth = false;
    await mockRouter.push('/');
    const { user } = renderWithProvidersAndUser(<Header />);

    const signUp = screen.getByRole('link', { name: /sign up/i });

    await user.click(signUp);

    expect(mockRouter.asPath).toEqual(NonProtectedPaths.SIGN_UP);
  });
});
