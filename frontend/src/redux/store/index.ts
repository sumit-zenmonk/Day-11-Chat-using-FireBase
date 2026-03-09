"use client"

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../feature/Auth/authSlice";
<<<<<<< HEAD
import usersReducer from "../feature/User-List/usersSlice";
import SelectedReceiverReducer from "../feature/selected-reciever/selected_reciever_slice";
=======
import usersReducer from "../feature/User/usersSlice";
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    authReducer: authReducer,
<<<<<<< HEAD
    usersReducer: usersReducer,
    SelectedReceiverReducer: SelectedReceiverReducer
=======
    usersReducer: usersReducer
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
