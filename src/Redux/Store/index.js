import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from "../reducer";
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
const Store = configureStore({
  reducer: persistedReducer,
})
export const persistor=persistStore(Store)
export default Store;
