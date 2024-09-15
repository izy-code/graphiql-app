import { screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';

import GraphQlPage from '@/app/[locale]/GRAPHQL/[[...path]]/page';
import { NO_ENDPOINT } from '@/common/constants';
import { ProtectedPaths } from '@/common/enums';
import en from '@/locales/en';
import { mockGraphQlEndpoint, rickCountGraphQlQueryMock, rickCountGraphQlResponseMock } from '@/test/mocks/mocks';
import { renderWithProvidersAndUser } from '@/utils/test-utils';
import { normalizeString } from '@/utils/utils';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn((arg: string): string => arg) })),
    usePathname: vi.fn(() => `/en/${ProtectedPaths.GRAPHQL}/${NO_ENDPOINT}`),
    useSearchParams: vi.fn(() => new URLSearchParams([['Content-Type', 'application/json']])),
  };
});

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useCurrentLocale: vi.fn(() => 'en'),
    useScopedI18n: vi.fn(
      () =>
        (arg: string): string =>
          en[`graphql.${arg}` as never],
    ),
    useI18n: vi.fn(
      () =>
        (arg: string): string =>
          en[arg as never],
    ),
  };
});

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    onBlur,
  }: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  }): ReactNode => (
    <input value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} data-testid="codemirror" />
  ),
  EditorView: {
    theme: (): Record<string, unknown> => ({}),
  },
}));

describe('GraphQL page', () => {
  it('renders correctly and allows user to enter an endpoint and query to make a request and get a response', async () => {
    const { container, user } = renderWithProvidersAndUser(<GraphQlPage />);

    const endpointInput = screen.getByRole('textbox', { name: en['graphql.endpoint'] });
    const editorArray: HTMLInputElement[] = screen.getAllByTestId('codemirror');
    const queryEditor = editorArray[0];
    const responseEditor = editorArray[editorArray.length - 1];

    await user.type(queryEditor!, rickCountGraphQlQueryMock);
    await user.type(endpointInput, mockGraphQlEndpoint);

    const requestButton = await screen.findByRole('button', { name: en['graphql.request'] });
    await user.click(requestButton);

    await waitFor(() => {
      expect(normalizeString(responseEditor!.value)).toBe(
        normalizeString(JSON.stringify(rickCountGraphQlResponseMock)),
      );
    });

    expect(container).toMatchSnapshot();
  });
});
