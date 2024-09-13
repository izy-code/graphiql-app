import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import NotFound from '@/app/not-found';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

describe('ErrorStatusPage Component', () => {
  it('render 404 page', async () => {
    await mockRouter.push('/404');
    renderWithProvidersAndUser(<NotFound />);

    expect(screen.getByText('The page you requested was not found.')).toBeInTheDocument();
  });

  it('Button Main page on 404 page should route to Main page', async () => {
    await mockRouter.push('/404');
    const { user } = renderWithProvidersAndUser(<NotFound />);

    const mainPage = screen.getByRole('button', { name: /main page/i });

    await user.click(mainPage);

    expect(mockRouter.asPath).toEqual('/');
  });
});
