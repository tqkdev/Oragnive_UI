import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import orderReducer from './User/OrderSlice';
import adminReducer from './Admin/adminSlice';
import productReducer from './Admin/productSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    product: productReducer,
    order: orderReducer,
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

// // Thêm sự kiện "beforeunload" để xóa dữ liệu lưu trữ khi thoát trình duyệt
// window.addEventListener('beforeunload', () => {
//     const persistedState = localStorage.getItem('persist:root');
//     if (persistedState) {
//         localStorage.removeItem('persist:root');
//     }
// });
