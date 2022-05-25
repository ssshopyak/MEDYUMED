import { createReducer } from '@reduxjs/toolkit';
import { reset, setFreeDates } from '../actions';
import { initialState } from '../initialState';

export const dateReducer = createReducer(initialState.date, (builder) => {
  builder
    .addCase(setFreeDates, (state, action) => (action.payload))
    .addCase(reset, () => initialState.date);
});
