import { createReducer } from '@reduxjs/toolkit';
import { reset, setTime } from '../actions';
import { initialState } from '../initialState';

export const timeReducer = createReducer(initialState.time, (builder) => {
  builder
    .addCase(setTime, (state, action) => (action.payload))
    .addCase(reset, () => initialState.time);
});
