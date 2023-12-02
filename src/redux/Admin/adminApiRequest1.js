// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginStart, loginFailed, loginSuccess, logoutStart, logoutFailed, logoutSuccess } from './adminSlice';
import {
    createStart,
    createSuccess,
    createFailed,
    deleteStart,
    deleteSuccess,
    deleteFailed,
    updateStart,
    updateSuccess,
    updateFailed,
} from './productSlice';

// Sử dụng Redux Thunk cho loginAdmin
export const loginAdmin = (admin, navigate) => {
    return async (dispatch) => {
        dispatch(loginStart());

        try {
            const res = await axios.post('http://localhost:3001/api/admin/login', admin, {
                withCredentials: true,
            });

            dispatch(loginSuccess(res.data));
            navigate('/admin/main');
        } catch (error) {
            dispatch(loginFailed());
        }
    };
};

// Redux Thunk cho logoutAdmin
export const logoutAdmin = (accessToken, axiosJWT, navigate) => {
    return async (dispatch) => {
        dispatch(logoutStart());

        try {
            await axiosJWT.post(
                'http://localhost:3001/api/admin/logout',
                {},
                {
                    withCredentials: true,
                    headers: { token: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                },
            );

            dispatch(logoutSuccess());
            navigate('/admin');
        } catch (error) {
            dispatch(logoutFailed());
        }
    };
};

// Redux Thunk cho addProduct
export const addProduct = (product, accessToken, axiosJWT, navigate) => {
    return async (dispatch) => {
        dispatch(createStart());

        try {
            const res = await axiosJWT.post('http://localhost:3001/api/product', product, {
                headers: { token: `Bearer ${accessToken}` },
            });

            dispatch(createSuccess(res.data));
            navigate('/admin/main');
        } catch (error) {
            dispatch(createFailed());
        }
    };
};

// Redux Thunk cho deleteProduct
export const deleteProduct = (id, accessToken, axiosJWT, navigate) => {
    return async (dispatch) => {
        dispatch(deleteStart());

        try {
            const res = await axiosJWT.delete('http://localhost:3001/api/product/' + id, {
                headers: { token: `Bearer ${accessToken}` },
            });

            dispatch(deleteSuccess(res.data));
            navigate('/admin/main');
        } catch (error) {
            dispatch(deleteFailed());
        }
    };
};

// Redux Thunk cho updateProduct
export const updateProduct = (slug, accessToken, product, axiosJWT, navigate) => {
    return async (dispatch) => {
        dispatch(updateStart());

        try {
            const res = await axiosJWT.put('http://localhost:3001/api/product/' + slug, product, {
                headers: { token: `Bearer ${accessToken}` },
            });

            dispatch(updateSuccess(res.data));
            navigate('/admin/main');
        } catch (error) {
            dispatch(updateFailed());
        }
    };
};
