import { createReducer} from '@reduxjs/toolkit';
import {  changeFilter } from './phonebook-actions';

const initialState = {
  contacts: {
    filter: '',
  },
};

export const filterReducer = createReducer(initialState.contacts.filter, {
  [changeFilter]: (_, { payload }) => payload,
});
