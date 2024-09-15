import { graphql, http, HttpResponse } from 'msw';

import { rickCountGraphQlResponseMock } from '../mocks/mocks';

export const handlers = [
  http.get(`https://rickandmortyapi.com/api/character/2`, () =>
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
    }),
  ),
  graphql.query('RickCount', () => HttpResponse.json({ data: rickCountGraphQlResponseMock }, { status: 200 })),
];
