import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import SignUpPage from '@/app/[locale]/sign-up/page';
import { NonProtectedPaths } from '@/common/enums';
import { AuthProvider } from '@/contexts/auth-context';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

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
