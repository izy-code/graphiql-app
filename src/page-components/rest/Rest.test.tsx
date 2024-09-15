import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { getResponse } from '@/common/restApi';
import en from '@/locales/en';
import { setResponseBody } from '@/store/rest-slice/rest-slice';
import { setupStore } from '@/store/store';

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

const normalizeString = (str: string): string => str.replace(/\s+/g, '').trim();

describe('Rest page', () => {
  it('renders correctly and show response body', async () => {
    await mockRouter.push('/en/GET');
    const responseData = await getResponse('GET', `https://rickandmortyapi.com/api/character/2`, {});

    const storeMemo = setupStore({});

    const { container } = render(
      <MemoryRouterProvider>
        <Provider store={storeMemo}>
          <Rest responseData={responseData} />
        </Provider>
      </MemoryRouterProvider>,
    );

    await waitFor(() => {
      storeMemo.dispatch(setResponseBody(JSON.stringify(responseData.data, null, 2)));

      const responseEditor: HTMLInputElement = screen.getByTestId('codemirror');

      expect(normalizeString(responseEditor.value)).toBe(normalizeString(JSON.stringify(responseData.data)));
    });

    expect(container).toMatchSnapshot();
  });
});
