import { render } from '@testing-library/react';

import Rest from './Rest';

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
    const { container } = render(<Rest responseData={{}} />);

    expect(container).toMatchSnapshot();
  });
});
