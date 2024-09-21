import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import SignUpPage from '@/app/[locale]/sign-up/page';
import { NonProtectedPaths } from '@/common/enums';
import { AuthProvider } from '@/contexts/auth-context';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

const translate = vi.fn((arg: string) => {
  switch (arg) {
    case 'name':
      return 'Name';
    case 'email':
      return 'Email';
    case 'password':
      return 'Enter password';
    case 'password.confirm':
      return 'Confirm password';
    case 'submit':
      return 'Sign up';
    default:
      return '';
  }
});

const translateValidation = vi.fn((arg: string) => {
  switch (arg) {
    case 'name.capital':
      return 'Name must start with a capital letter';
    case 'email.format':
      return 'Email must have valid format';
    case 'password.number':
      return 'Password must contain a number';
    case 'confirm.match':
      return 'Passwords do not match';
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
        case 'sign-up':
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

describe('Sign up page', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvidersAndUser(
      <AuthProvider>
        <SignUpPage />
      </AuthProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('validation error messages should be visible and submit button must be disabled', async () => {
    const { user } = renderWithProvidersAndUser(
      <AuthProvider>
        <SignUpPage />
      </AuthProvider>,
    );

    const name = screen.getByLabelText(/name/i);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/enter password/i);
    const confirmPassword = screen.getByLabelText(/confirm password/i);

    await user.type(name, 'name');
    await user.type(email, 'email');
    await user.type(password, 'password');
    await user.type(confirmPassword, 'password1');

    expect(screen.getByText('Name must start with a capital letter')).toBeInTheDocument();
    expect(screen.getByText('Email must have valid format')).toBeInTheDocument();
    expect(screen.getByText('Password must contain a number')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeDisabled();
  });

  it('user will be redirected to main page after sign up', async () => {
    await mockRouter.push(NonProtectedPaths.SIGN_UP);

    const { user } = renderWithProvidersAndUser(
      <AuthProvider>
        <SignUpPage />
      </AuthProvider>,
    );
    const name = screen.getByLabelText(/name/i);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/enter password/i);
    const confirmPassword = screen.getByLabelText(/confirm password/i);
    const submit = screen.getByRole('button', { name: /sign up/i });

    await user.type(name, 'Test');
    await user.type(email, 'test@test.com');
    await user.type(password, 'testtestA1@');
    await user.type(confirmPassword, 'testtestA1@');
    await user.click(submit);

    expect(mockRouter.asPath).toEqual('/');
  });
});
