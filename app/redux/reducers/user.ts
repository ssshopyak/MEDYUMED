import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import {
  setEmail, setName, setPhone, setToken, setBirthday, setSurname, setPatronymic, reset,
} from '../actions';

export const userReducer = createReducer(initialState.user, (builder) => {
  builder
    .addCase(setToken, (state, action) => ({ ...state, token: action.payload }))
    .addCase(setName, (state, action) => ({ ...state, name: action.payload }))
    .addCase(setSurname, (state, action) => ({ ...state, surname: action.payload }))
    .addCase(setPatronymic, (state, action) => ({ ...state, patronymic: action.payload }))
    .addCase(setEmail, (state, action) => ({ ...state, email: action.payload }))
    .addCase(setPhone, (state, action) => ({ ...state, phone: action.payload }))
    .addCase(setBirthday, (state, action) => ({ ...state, birthday: action.payload }))
    .addCase(reset, () => initialState.user);
});
