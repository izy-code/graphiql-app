import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
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

  it('displays the error message from errorBoundaryMessage prop', () => {
    const errorBoundaryMessage = 'Boundary error message';

    render(<ErrorPage errorBoundaryMessage={errorBoundaryMessage} />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Boundary error message')).toBeInTheDocument();
  });

  it('sets errorMessage to null if routeError is not recognized', () => {
    render(<ErrorPage errorBoundaryMessage={null} />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.queryByText('Error message:')).not.toBeInTheDocument();
  });

  it('reloads the page when the refresh button is clicked', async () => {
    const user = userEvent.setup();

    render(<ErrorPage errorBoundaryMessage={null} />);

    const refreshButton = screen.getByRole('button', { name: /refresh the page/i });
    await user.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
