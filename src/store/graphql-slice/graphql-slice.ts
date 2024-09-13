import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IntrospectionQuery } from 'graphql';

import type { TableRow } from '@/components/client-table/types';

interface GraphQlState {
  query: string;
  variables: string;
  status: string;
  responseBody: string;
  endpoint: string;
  schemaUrl: string;
  headers: TableRow[];
  currentSchema: IntrospectionQuery | null;
  isSchemaShown: boolean;
}

const initialState: GraphQlState = {
  query: '',
  variables: '',
  status: 'N/A',
  responseBody: '',
  endpoint: '',
  schemaUrl: '',
  headers: [],
  currentSchema: null,
  isSchemaShown: false,
};

const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setResponseBody(state, action: PayloadAction<string>) {
      state.responseBody = action.payload;
    },
    setEndpoint(state, action: PayloadAction<string>) {
      state.endpoint = action.payload;
    },
    setSchemaUrl(state, action: PayloadAction<string>) {
      state.schemaUrl = action.payload;
    },
    setHeaders(state, action: PayloadAction<TableRow[]>) {
      state.headers = action.payload;
    },
    setCurrentSchema(state, action: PayloadAction<Draft<IntrospectionQuery> | null>) {
      state.currentSchema = action.payload;
    },
    setIsSchemaShown(state, action: PayloadAction<boolean>) {
      state.isSchemaShown = action.payload;
    },
  },
});

export const {
  setQuery,
  setVariables,
  setStatus,
  setResponseBody,
  setEndpoint,
  setSchemaUrl,
  setHeaders,
  setCurrentSchema,
  setIsSchemaShown,
} = graphqlSlice.actions;

export default graphqlSlice.reducer;
