import { http, HttpResponse } from 'msw';

import { charactersDataMock } from '../mocks/mocks';

export const MOCK_SEARCH_NAME = 'example';
export const MOCK_PAGE_NUMBER = '1';
export const MOCK_STATUS_500 = 'status 500';

export const handlers = [
  http.get(`https://rickandmortyapi.com/api/character/2`, (/* { request } */) =>
    /*     const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');
    const name = searchParams.get('name');

    if (page === MOCK_PAGE_NUMBER && name === MOCK_SEARCH_NAME) {
      return HttpResponse.json(charactersDataMock);
    }

    if (name === MOCK_STATUS_500) {
      return new HttpResponse(null, { status: 500 });
    }

    return new HttpResponse(null, { status: 404 }); */

    HttpResponse.json({
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:50:21.651Z',
    }),),
];
