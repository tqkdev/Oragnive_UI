import axios from 'axios';
import {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
    logoutStart,
    logoutFailed,
    logoutSuccess,
} from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:3001/api/user/login', user, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:3001/api/user/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            'http://localhost:3001/api/user/logout',
            {},
            {
                withCredentials: 'include',
                headers: { token: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            },
        );
        dispatch(logoutSuccess());
        navigate('/');
    } catch (error) {
        dispatch(logoutFailed());
    }
};
