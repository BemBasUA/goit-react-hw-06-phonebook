import { configureStore, current } from '@reduxjs/toolkit';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const storeContacts = createAction('contacts/storeContacts');

const contactsInitialState = [];
const filterInitialState = '';

const persistConfig = {
  key: 'root',
  storage,
};

const contactsReducer = createReducer(contactsInitialState, {
  [addContact]: (state, action) => {
    state.push(action.payload);
  },
  [deleteContact]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
  [storeContacts]: (state, action) => action.payload,
});

const filterReducer = createReducer(filterInitialState, {});

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
});
export const persistor = persistStore(store);
