import { render } from '@testing-library/react';

import RestPage from '@/app/[locale]/rest/[[...rest]]/page';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn((arg: string): string => arg) })),
  };
});

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

describe.skip('Rest page', () => {
  it('renders correctly', () => {
    const { container } = render(<RestPage />);

    expect(container).toMatchSnapshot();
  });
});
