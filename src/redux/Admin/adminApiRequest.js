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

export const loginAdmin = async (admin, dispatch, navigate) => {
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

export const logoutAdmin = async (dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            'http://localhost:3001/api/admin/logout',

            {},
            { withCredentials: true, headers: { token: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
        );
        dispatch(logoutSuccess());
        navigate('/admin');
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const addProduct = async (product, dispatch, navigate, accessToken, axiosJWT) => {
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

export const deleteProduct = async (id, dispatch, navigate, accessToken, axiosJWT) => {
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

export const updateProduct = async (slug, dispatch, navigate, accessToken, product, axiosJWT) => {
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
