// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import userReducer from "./userSlice";
import studentReducer from './studentSlice'
import staffReducer from './staffSlice'
import classReducer from './classesSlice'
import subjectReducer from './subjectSlice'

const rootReducer = combineReducers({
  user: userReducer, 
  student: studentReducer,
  staff:staffReducer,
  classes:classReducer,
  subjects:subjectReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
