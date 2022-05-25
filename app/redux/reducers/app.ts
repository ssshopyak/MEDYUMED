import { createReducer } from '@reduxjs/toolkit';
import { reset, setInitialized, setLanguage } from '../actions';
import { AppState } from '../../lib/types';
import { initialState } from '../initialState';

export const appReducer = createReducer<AppState>(initialState.app, (builder) => {
  builder
    .addCase(setInitialized, state => ({ ...state, initialized: true }))
    .addCase(setLanguage, (state, action) => ({ ...state, language: action.payload }))
    .addCase(reset, () => initialState.app);
});
