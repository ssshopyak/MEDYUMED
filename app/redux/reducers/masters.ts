import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setDellMaster, setMasters, setUpdateMaster } from '../actions';

export const masterReducer = createReducer(initialState.masters, (builder) => {
  builder
    .addCase(setMasters, (state, action) => (action.payload))
    .addCase(setUpdateMaster, (state, action) => [...state, action.payload])
    .addCase(setDellMaster, (state, action) => (action.payload))
    .addCase(reset, () => initialState.masters);
});
