import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { type RootState } from './store';

const initialState = false;

export const authSLice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogin: () => true,
    handleLogout: () => false,
  },
});

export const { handleLogin, handleLogout } = authSLice.actions;

const selectAuth = (state: RootState): boolean => state.auth;

export const useAuth = (): boolean => useSelector(selectAuth);
