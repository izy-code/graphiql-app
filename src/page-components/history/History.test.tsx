import { screen } from '@testing-library/react';

import HistoryPage from '@/app/[locale]/history/page';
import { LOCAL_STORAGE_KEY } from '@/hooks/useLocalStorage';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

const translate = vi.fn((arg: string) => {
  switch (arg) {
    case 'empty.title':
      return 'You haven’t executed any requests';
    default:
      return '';
  }
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn((arg: string): string => arg) })),
  };
});

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useScopedI18n: vi.fn(() => translate),
  };
});

describe('History page', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvidersAndUser(<HistoryPage />);

    expect(container).toMatchSnapshot();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('show requests list correctly', () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        'request-list': ['http://localhost:3000/en/GET/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2FwaS9jaGFyYWN0ZXIvMg/IA'],
      }),
    );
    renderWithProvidersAndUser(<HistoryPage />);

    expect(screen.getByText('https://rickandmortyapi.com/api/character/2')).toBeInTheDocument();
  });

  it('show empty message when no requests', () => {
    renderWithProvidersAndUser(<HistoryPage />);

    expect(screen.getByText('You haven’t executed any requests')).toBeInTheDocument();
  });
});
