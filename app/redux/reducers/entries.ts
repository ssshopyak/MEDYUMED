import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { setEntries, reset, setAllEntries, setEntryInEntries } from '../actions';

export const entriesReducer = createReducer(initialState.entries, (builder) => {
  builder
    .addCase(setEntryInEntries, (state, action) => ([...state, action.payload]))
    .addCase(setEntries, (state, action) => ([...action.payload]))
    .addCase(setAllEntries, (state, action) => ([...action.payload]))
    .addCase(reset, () => (initialState.entries));
});
