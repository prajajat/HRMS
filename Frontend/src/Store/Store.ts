import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice'
import userReducer from './userSlice'
import {persistStore ,persistReducer}from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer =combineReducers( {
    tokens: tokenReducer,
    user:userReducer
})
const persistConfig=
{
  key:'root',
  storage,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);
export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})
export const persistor=persistStore(store);
export type AppDispatch =typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

