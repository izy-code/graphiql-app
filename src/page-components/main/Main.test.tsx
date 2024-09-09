import { screen } from '@testing-library/react';
import React from 'react';

import MainPage from '@/app/[locale]/page';
import { AuthProvider } from '@/contexts/auth-context';
import en from '@/locales/en';
import ru from '@/locales/ru';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

let text: string = en['main.welcome'];
const translate = vi.fn(() => text);

vi.mock('@/locales/client', async () => {
  const actual = await vi.importActual('@/locales/client');

  return {
    ...actual,
    useScopedI18n: vi.fn(() => translate),
  };
});

describe('Main page', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvidersAndUser(
      <AuthProvider>
        <MainPage />
      </AuthProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Show welcome message with en locale', () => {
    renderWithProvidersAndUser(
      <AuthProvider>
        <MainPage />
      </AuthProvider>,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('Show welcome message with ru locale', () => {
    text = ru['main.welcome'];

    renderWithProvidersAndUser(
      <AuthProvider>
        <MainPage />
      </AuthProvider>,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
