import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import SignInPage from '@/app/[locale]/sign-in/page';
import { NonProtectedPaths } from '@/common/enums';
import { Toast } from '@/components/toast/Toast';
import { AuthProvider } from '@/contexts/auth-context';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

const translate = vi.fn((arg: string) => {
  switch (arg) {
    case 'email':
      return 'Email';
    case 'password':
      return 'Password';
    case 'submit':
      return 'Sign in';
    default:
      return '';
  }
});

const translateValidation = vi.fn((arg: string) => {
  switch (arg) {
    case 'email.format':
      return 'Email must have valid format';
    case 'password.number':
      return 'Password must contain a number';
    default:
      return '';
  }
});

const translateAuth = vi.fn(() => 'Loading Firebase...');

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useScopedI18n: vi.fn((arg: string) => {
      switch (arg) {
        case 'sign-in':
          return translate;
        case 'validation':
          return translateValidation;
        case 'auth':
          return translateAuth;
        default:
          return {};
      }
    }),
  };
});

describe('Sign in page', () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, pathname: '/en' },
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });

  it('renders correctly', () => {
    const { container } = renderWithProvidersAndUser(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('validation error messages should be visible and submit button must be disabled', async () => {
    const { user } = renderWithProvidersAndUser(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>,
    );

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);

    await user.type(email, 'email');
    await user.type(password, 'password');

    expect(screen.getByText('Email must have valid format')).toBeInTheDocument();
    expect(screen.getByText('Password must contain a number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  it('user will be redirected to main page after sign in', async () => {
    await mockRouter.push(NonProtectedPaths.SIGN_IN);

    const { user } = renderWithProvidersAndUser(
      <AuthProvider>
        <SignInPage />
        <Toast />
      </AuthProvider>,
    );

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /sign in/i });

    await user.type(email, 'test@test.com');
    await user.type(password, 'testtestA1@');
    await user.click(submit);

    expect(mockRouter.asPath).toEqual('/');
    expect(screen.getByText(`Successfully signed in with test@test.com!`)).toBeInTheDocument();
  });
});
