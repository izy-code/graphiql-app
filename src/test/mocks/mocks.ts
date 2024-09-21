export const mockGraphQlEndpoint = 'https://rickandmortyapi.com/graphql';

export const rickCountGraphQlQueryMock = `query RickCount{{
  characters(filter: {{ name: "rick" }) {{
    info {{
      count
    }
  }
}`;

export const rickCountGraphQlResponseMock = {
  characters: {
    info: {
      count: 107,
    },
  },
};
