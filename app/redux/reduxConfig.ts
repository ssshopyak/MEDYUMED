import { createLogger } from 'redux-logger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { reducers } from './reducers';

const loggerMiddleware = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  timestamp: true,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['bonuses', 'clubs', 'confirmedEntries', 'popularCategories'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware),
});

export const persistor = persistStore(store);
