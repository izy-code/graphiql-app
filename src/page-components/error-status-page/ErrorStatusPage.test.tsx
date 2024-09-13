import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import { renderWithProvidersAndUser } from '@/utils/test-utils';

import ErrorStatusPage from './ErrorStatusPage';

const translate = vi.fn((arg: string) => {
  switch (arg) {
    case 'back':
      return 'Previous page';
    case 'main':
      return 'Main page';
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

describe('ErrorStatusPage Component', () => {
  it('render 404 page', async () => {
    await mockRouter.push('/404');
    renderWithProvidersAndUser(<ErrorStatusPage status={404} message="The page you requested was not found." />);

    expect(screen.getByText('The page you requested was not found.')).toBeInTheDocument();
  });

  it('Button Main page on 404 page should route to Main page', async () => {
    await mockRouter.push('/404');
    const { user } = renderWithProvidersAndUser(
      <ErrorStatusPage status={404} message="The page you requested was not found." />,
    );

    const mainPage = screen.getByRole('button', { name: /main page/i });

    await user.click(mainPage);

    expect(mockRouter.asPath).toEqual('/');
  });
});
