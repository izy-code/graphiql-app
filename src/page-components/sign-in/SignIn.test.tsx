import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import SignInPage from '@/app/[locale]/sign-in/page';
import { NonProtectedPaths } from '@/common/enums';
import { AuthProvider } from '@/contexts/auth-context';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

describe('Sign in page', () => {
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
      </AuthProvider>,
    );

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /sign in/i });

    await user.type(email, 'test@test.com');
    await user.type(password, 'testtestA1@');
    await user.click(submit);

    expect(mockRouter.asPath).toEqual('/');
  });
});
