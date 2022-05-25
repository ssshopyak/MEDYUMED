import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setEntry } from '../actions';

export const entryReducer = createReducer(initialState.entry, (builder) => {
  builder
    .addCase(setEntry, (state, action) => ({ ...state, ...action.payload }))
    .addCase(reset, () => initialState.entry);
});
