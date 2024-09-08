import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ObjectWithId } from '@/components/client-table/types';

interface RestState {
  method: string;
  body: string;
  endpoint: string;
  headers: ObjectWithId[];
  variables: ObjectWithId[];
  status: string;
  responseBody: string;
}

const initialState: RestState = {
  method: 'GET',
  body: '',
  endpoint: '',
  headers: [],
  variables: [],
  status: 'N/A',
  responseBody: '',
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
    setHeaders(state, action: PayloadAction<ObjectWithId[]>) {
      state.headers = action.payload;
    },
    setVariables(state, action: PayloadAction<ObjectWithId[]>) {
      state.variables = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setResponseBody(state, action: PayloadAction<string>) {
      state.responseBody = action.payload;
    },
  },
});

export const { setMethod, setBody, setEndpoint, setHeaders, setVariables, setStatus, setResponseBody } =
  restSlice.actions;
export default restSlice.reducer;
