import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TableRow } from '@/components/client-table/types';

interface RestState {
  method: string;
  body: string;
  endpoint: string;
  headers: TableRow[];
  variables: TableRow[];
  status: string;
  responseBody: string;
  isPlainText: boolean;
}

const initialState: RestState = {
  method: 'GET',
  body: '',
  endpoint: '',
  headers: [],
  variables: [],
  status: '-',
  responseBody: '',
  isPlainText: false,
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<string>) {
      state.method = action.payload;
    },
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setEndpoint(state, action: PayloadAction<string>) {
      state.endpoint = action.payload;
    },
    setHeaders(state, action: PayloadAction<TableRow[]>) {
      state.headers = action.payload;
    },
    setVariables(state, action: PayloadAction<TableRow[]>) {
      state.variables = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setResponseBody(state, action: PayloadAction<string>) {
      state.responseBody = action.payload;
    },
    setIsPlainText(state, action: PayloadAction<boolean>) {
      state.isPlainText = action.payload;
    },
  },
});

export const { setMethod, setBody, setEndpoint, setHeaders, setVariables, setStatus, setResponseBody, setIsPlainText } =
  restSlice.actions;
export default restSlice.reducer;
