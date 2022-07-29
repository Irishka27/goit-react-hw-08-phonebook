import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  changeContactName,
  changeContactNumber,
} from './phonebook-operations';
import { changeFilter } from './phonebook-actions';

const initialState = {
  contacts: {
    items: [],
    filter: '',
    loading: false,
    error: null,
  },
};

const itemsReducer = createReducer(initialState.contacts.items, {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => {
    return [payload, ...state];
  },
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
  [changeContactName.fulfilled]: (state, { payload }) =>
    state.map(contact => (contact.id === payload.id ? payload : contact)),

  [changeContactNumber.fulfilled]: (state, { payload }) =>
    (state = state.map(contact =>
      contact.id === payload.id
        ? { ...contact, number: payload.number }
        : contact
    )),
});

const filterReducer = createReducer(initialState.contacts.filter, {
  [changeFilter]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(initialState.contacts.loading, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
  [changeContactName.pending]: () => true,
  [changeContactName.fulfilled]: () => false,
  [changeContactName.rejected]: () => false,
  [changeContactNumber.pending]: () => true,
  [changeContactNumber.fulfilled]: () => false,
  [changeContactNumber.rejected]: () => false,
});

const errorReducer = createReducer(initialState.contacts.error, {
  [fetchContacts.rejected]: (_, action) => action.payload,
  [fetchContacts.pending]: () => null,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});
