import { createReducer } from '@reduxjs/toolkit';
import { reset, setClubs } from '../actions';
import { initialState } from '../initialState';

export const clubReducer = createReducer(initialState.clubs, (builder) => {
  builder
    .addCase(setClubs, (state, action) => (action.payload))
    .addCase(reset, () => initialState.clubs);
});
