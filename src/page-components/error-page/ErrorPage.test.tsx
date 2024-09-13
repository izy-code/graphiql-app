import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import ErrorPage from '@/app/[locale]/error';

const translate = vi.fn((arg: string) => {
  switch (arg) {
    case 'title':
      return 'Oops!';
    case 'text':
      return 'Sorry, an unexpected error has occurred.';
    case 'desc':
      return 'Error message:';
    case 'recommendation':
      return 'Please try to refresh the page.';
    case 'refresh':
      return 'Refresh the page';
    default:
      return '';
  }
});

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useScopedI18n: vi.fn(() => translate),
  };
});

describe('ErrorPage', () => {
  const original = window.location;
  const reloadMock = vi.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });

  it('displays the error message from errorMessage prop', () => {
    render(<ErrorPage error={new Error('Boundary error message')} />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Boundary error message')).toBeInTheDocument();
  });

  it('sets errorMessage to null if routeError is not recognized', () => {
    const c = console;
    c.error = vi.fn();
    render(<ErrorPage error={new Error()} />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.queryByText('Error message:')).not.toBeInTheDocument();
  });

  it('reloads the page when the refresh button is clicked', async () => {
    const user = userEvent.setup();

    render(<ErrorPage error={new Error()} />);

    const refreshButton = screen.getByRole('button', { name: /refresh the page/i });
    await user.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
