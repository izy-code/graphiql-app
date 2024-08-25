export enum SearchParams {
  NAME = 'name',
  PAGE = 'page',
  DETAILS = 'details',
}

export enum LocalStorageKeys {
  SEARCH = 'search-term',
  THEME = 'is-dark-theme',
}

export enum NonProtectedPaths {
  REGISTER = '/register',
  LOGIN = '/login',
}

export enum ProtectedPaths {
  REST = '/rest',
  GRAPHIQL = '/graphiql',
  HISTORY = '/history',
}
