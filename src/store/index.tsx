"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import adminReducer from './slices/adminSlice'
import formReducer from './slices/formSlice'

import storage from "redux-persist/lib/storage";
import blogReducer from "@/store/slices/blogSlice"

import tokenReducer from "@/store/slices/authSlice";
import campaignReducer from  "@/store/slices/campaignSlice"
import galleryReducer from  "@/store/slices/gallerySlice"


const tokenPersistConfig = {
  key: "token",
  storage,
};
const campaignPersisConfig ={
  key: "campaign",
  storage
}
const blogPersistConfig = {
  key: "blog",
    storage
  };

  const galleryPersistConfig = {
    key: "gallery",
      storage
    };

const rootReducer = combineReducers({

  token: persistReducer(tokenPersistConfig, tokenReducer),
  blog: persistReducer (blogPersistConfig, blogReducer),
  campaign: persistReducer(campaignPersisConfig, campaignReducer),
  gallery: persistReducer(galleryPersistConfig, galleryReducer),
   admin: adminReducer,
  forms: formReducer
  
  
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
