// import { screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import { getResponse } from '@/common/restApi';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

import Rest from './Rest';

const translate = vi.fn(() => '');

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useScopedI18n: vi.fn((arg: string) => {
      switch (arg) {
        case 'rest':
          return translate;
        case 'response':
          return translate;
        case 'clientTable':
          return translate;
        case 'requestButton':
          return translate;
        default:
          return {};
      }
    }),
    useI18n: vi.fn(() => vi.fn(() => 'Method')),
    useCurrentLocale: vi.fn(() => 'en'),
  };
});

describe('Rest page', () => {
  /*   it('renders correctly', () => {
    const { container } = render(<Rest responseData={{}} />);

    expect(container).toMatchSnapshot();
  }); */

  it('renders correctly', async () => {
    await mockRouter.push('/en/GET');
    const responseData = await getResponse('GET', `https://rickandmortyapi.com/api/character/2`, {});
    const { container } = renderWithProvidersAndUser(<Rest responseData={responseData} />);

    // expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
