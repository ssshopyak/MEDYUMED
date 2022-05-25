import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setBonuses } from '../actions';

export const bonusesReducer = createReducer(initialState.bonuses, (builder) => {
  builder
    .addCase(setBonuses, (state, action) => (action.payload))
    .addCase(reset, () => initialState.bonuses);
});
