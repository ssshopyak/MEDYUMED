import { createAction } from '@reduxjs/toolkit';
import {
  Bonuses, Clubs, Comment, Entry, IAppointmentServices, IConfirmationEntries, IPopularCategories, Master, User,
} from '../lib/types';
import { ApiReview } from '../model/api/apiTypes';

export const setInitialized = createAction<void>('SET_INITIALIZED');

export const setLanguage = createAction<string>('SET_LANGUAGE');

export const setUser = createAction<User>('SET_USER');

export const setToken = createAction<string>('SET_TOKEN');

export const setName = createAction<string>('SET_NAME');

export const setSurname = createAction<string>('SET_SURNAME');

export const setPatronymic = createAction<string>('SET_PATRONYMIC');

export const setEmail = createAction<string>('SET_EMAIL');

export const setPhone = createAction<string>('SET_PHONE');

export const setBirthday = createAction<string | undefined>('SET_BIRTHDAY');

export const setCommentsFromMaster = createAction<Comment>('SET_COMMENTS_FROM_MASTERS');

export const setMasters = createAction<Master[]>('SET_MASTERS');

export const setUpdateMaster = createAction<Master>('SET_UPDATE_MASTER');

export const setDellMaster = createAction<Master[]>('SET_DELL_MASTER');

export const setComments = createAction<ApiReview[]>('SET_COMMENTS');

export const setComment = createAction<ApiReview>('SET_COMMENT');

export const setClubs = createAction<Clubs[]>('SET_CLUBS');

export const setBonuses = createAction<Bonuses[]>('SET_BONUSES');

export const setFreeDates = createAction<string[]>('SET_FREE_DATES');

export const setTime = createAction<{dateTime: string, appointmentId: string}[]>('SET_TIME');

export const setEntry = createAction<Entry>('SET_ENTRY');

export const setEntryInEntries = createAction<Entry>('SET_ENTRY_IN_ENTRIES');

export const setEntries = createAction<Entry[]>('SET_ENTRIES');

export const setAllEntries = createAction<Entry[]>('SET_ALL_ENTRIES');

export const setPopularCategories = createAction<IPopularCategories[]>('SET_POPULAR_CATEGORIES');

export const setConfirmedEntries = createAction<IConfirmationEntries[]>('SET_CONFIRMED_ENTRIES');

export const setAppointmentServices = createAction<{[key: string]: IAppointmentServices[]}>('SET_APPOINTMENT_SERVICES');

export const reset = createAction<void>('RESET');
