import axios from 'axios';
import { loginStart, loginFailed, loginSuccess, logoutStart, logoutFailed, logoutSuccess } from './adminSlice';

export const loginAdmin = async (admin, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin/login`, admin, {
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
            `${import.meta.env.VITE_URL_BACKEND}/admin/logout`,

            {},
            { withCredentials: true, headers: { token: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
        );
        dispatch(logoutSuccess());
        navigate('/admin');
    } catch (error) {
        dispatch(logoutFailed());
    }
};
