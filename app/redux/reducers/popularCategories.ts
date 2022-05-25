import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setPopularCategories } from '../actions';

export const popularCategoriesReducer = createReducer(initialState.popularCategories, (builder) => {
  builder
    .addCase(setPopularCategories, (state, action) => (action.payload))
    .addCase(reset, () => initialState.popularCategories);
});
