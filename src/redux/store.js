import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './phonebook/phonebook-reducers';
import logger from 'redux-logger';
import { contactsApi } from './phonebook/phonebook-slice';

export const store = configureStore({
  reducer: {
    filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    logger,
  ],
  devTools: process.env.NODE_ENV === 'development',
});



