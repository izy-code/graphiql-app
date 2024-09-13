import { http, HttpResponse } from 'msw';

import { charactersDataMock } from '../mocks/mocks';

export const MOCK_SEARCH_NAME = 'example';
export const MOCK_PAGE_NUMBER = '1';
export const MOCK_STATUS_500 = 'status 500';

export const handlers = [
  http.get(`*/example`, ({ request }) => {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');
    const name = searchParams.get('name');

    if (page === MOCK_PAGE_NUMBER && name === MOCK_SEARCH_NAME) {
      return HttpResponse.json(charactersDataMock);
    }

    if (name === MOCK_STATUS_500) {
      return new HttpResponse(null, { status: 500 });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
