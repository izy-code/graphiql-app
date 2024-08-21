import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const exampleAdapter = createEntityAdapter();

const initialState = exampleAdapter.getInitialState();

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    selectItem: (state, action) => {
      exampleAdapter.addOne(state, action);
    },
    unselectItem: (state, action) => {
      exampleAdapter.removeOne(state, action);
    },
    unselectAll: (state) => {
      exampleAdapter.removeAll(state);
    },
  },
});

export const { selectItem, unselectItem, unselectAll } = exampleSlice.actions;

export const { selectAll: selectAllExample, selectById: selectExampleItemById } = exampleAdapter.getSelectors(
  (state: RootState) => state.example,
);
