// import { screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { type ReactNode } from 'react';

import { getResponse } from '@/common/restApi';
import en from '@/locales/en';
import { renderWithProvidersAndUser } from '@/utils/test-utils';

import Rest from './Rest';

const translateREST = vi.fn((arg: string) => en[`rest.${arg}` as never]);
const translateResponse = vi.fn((arg: string) => en[`response.${arg}` as never]);
const translateTable = vi.fn((arg: string) => en[`clientTable.${arg}` as never]);
const translateRequestButton = vi.fn((arg: string) => en[`requestButton.${arg}` as never]);
const translateCode = vi.fn((arg: string) => en[`customTextarea.${arg}` as never]);

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn((): boolean => true) }));

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useScopedI18n: vi.fn((arg: string) => {
      switch (arg) {
        case 'rest':
          return translateREST;
        case 'response':
          return translateResponse;
        case 'clientTable':
          return translateTable;
        case 'requestButton':
          return translateRequestButton;
        case 'customTextarea':
          return translateCode;
        default:
          return {};
      }
    }),
    useI18n: vi.fn(() => vi.fn(() => 'Method')),
    useCurrentLocale: vi.fn(() => 'en'),
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
