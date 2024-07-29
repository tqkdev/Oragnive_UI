import axios from 'axios';
import { loginStart, loginFailed, loginSuccess, logoutStart, logoutFailed, logoutSuccess } from './adminSlice';

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
