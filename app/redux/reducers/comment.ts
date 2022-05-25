import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setComment, setComments } from '../actions';

export const commentReducer = createReducer(initialState.comments, (builder) => {
  builder
    .addCase(setComment, (state, action) => ([...state, action.payload]))
    .addCase(setComments, (state, action) => (action.payload))
    .addCase(reset, () => initialState.comments);
});
