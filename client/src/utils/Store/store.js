import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

import weddingwebsiteReducer from "./slices/weddingwebsiteSlice";
import weddingtemplateReducer from "./slices/weddingtemplateSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getWeddingWebsite } from "./slices/weddingwebsiteSlice";
import { isPlain } from "lodash";

const rootReducer = combineReducers({
  auth: authReducer,
  weddingwebsite: weddingwebsiteReducer,
  weddingtemplates: weddingtemplateReducer,
});

const persistConfig = {
  key: "nyouta",
  storage,
  whitelist: ['weddingwebsite', 'weddingtemplates'] // Don't persist auth state
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const forceGetWeddingWebsiteMiddleware = (store) => (next) => (action) => {
  if (action.type === "weddingwebsite/forceFetch") {
    if (isPlain(action.payload)) {
      store.dispatch(getWeddingWebsite(action.payload));
    } else {
      console.warn(
        "Non-serializable value detected in action payload:",
        action.payload
      );
    }
  }
  return next(action);
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(forceGetWeddingWebsiteMiddleware),
});
const persistor = persistStore(store);

export { store, persistor };

export default store;
