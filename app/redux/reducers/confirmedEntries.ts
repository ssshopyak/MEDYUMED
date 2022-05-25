import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setConfirmedEntries } from '../actions';

export const confirmedEntriesReducer = createReducer(initialState.confirmedEntries, (builder) => {
  builder
    .addCase(setConfirmedEntries, (state, action) => ([...action.payload]))
    .addCase(reset, () => initialState.confirmedEntries);
});
