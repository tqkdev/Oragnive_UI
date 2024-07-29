import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import adminReducer from './Admin/adminSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
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
export let persistor = persistStore(store);
