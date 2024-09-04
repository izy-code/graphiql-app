import { render } from '@testing-library/react';

import GraphiQlPage from '@/app/[locale]/graphiql/[[...graphiql]]/page';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn((arg: string): string => arg) })),
  };
});

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

describe.skip('GraphQL page', () => {
  it('renders correctly', () => {
    const { container } = render(<GraphiQlPage />);

    expect(container).toMatchSnapshot();
  });
});
