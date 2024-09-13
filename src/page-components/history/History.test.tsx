import { render } from '@testing-library/react';

import HistoryPage from '@/app/[locale]/history/page';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn((arg: string): string => arg) })),
  };
});

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

describe.skip('History page', () => {
  it('renders correctly', () => {
    const { container } = render(<HistoryPage />);

    expect(container).toMatchSnapshot();
  });
});
