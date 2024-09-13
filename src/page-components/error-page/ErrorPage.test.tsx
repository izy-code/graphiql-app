import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import ErrorPage from '@/app/error';
import GlobalErrorPage from '@/app/global-error';

describe.skip('ErrorPage', () => {
  const original = window.location;
  const reloadMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

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
    render(<GlobalErrorPage error={new Error()} />);

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
