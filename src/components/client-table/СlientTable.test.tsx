import { screen } from '@testing-library/react';

import { ClientTable } from '@/components/client-table/ClientTable';
import en from '@/locales/en';
import { renderWithUserSetup } from '@/utils/test-utils';

const translate = vi.fn((arg: string) => en[`clientTable.${arg}` as never]);

vi.mock('@/locales/client', async (importOriginal) => {
  const actual = await importOriginal<object>();

  return {
    ...actual,
    useScopedI18n: vi.fn(() => translate),
  };
});

describe('ClientTable Component', () => {
  it('arrow button show key/value pairs', async () => {
    let arrayRows: { id: string; key: string; value: string }[] = [];
    const { user } = renderWithUserSetup(
      <ClientTable
        title=""
        tableInfo={arrayRows}
        onChange={(arg: { id: string; key: string; value: string }[]) => {
          arrayRows = arg;
        }}
      />,
    );

    const arrowButton = screen.getByText(/show/i);

    await user.click(arrowButton);

    expect(screen.getAllByText(/key/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/value/i)[0]).toBeInTheDocument();
  });
});
