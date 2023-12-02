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

import {
    getOrderStart,
    getOrderSuccess,
    getOrderFailed,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailed,
    updateOderStart,
    updateOderSuccess,
    updateOderFailed,
    updateQualityStart,
    updateQualitySuccess,
    updateQualityFailed,
} from './OrderSlice';

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
            { withCredentials: true, headers: { token: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
        );
        dispatch(logoutSuccess());
        navigate('/');
    } catch (error) {
        dispatch(logoutFailed());
    }
};

// export const getOrder = async (userId, dispatch, accessToken, axiosOrder) => {
//     dispatch(getOrderStart());
//     try {
//         const res = await axiosOrder.get('http://localhost:3001/api/order/' + userId, {
//             headers: { token: `Bearer ${accessToken}` },
//         });
//         dispatch(getOrderSuccess(res.data));
//     } catch (error) {
//         dispatch(getOrderFailed());
//     }
// };

export const getOrder = (userId, accessToken, axiosOrder) => {
    return async (dispatch) => {
        dispatch(getOrderStart());
        try {
            const res = await axiosOrder.get(`http://localhost:3001/api/order/${userId}`, {
                headers: { token: `Bearer ${accessToken}` },
            });
            dispatch(getOrderSuccess(res.data));
        } catch (error) {
            dispatch(getOrderFailed());
        }
    };
};

// export const updateOrder = async (userId, dispatch, accessToken, productOrder, axiosJWT) => {
//     dispatch(updateOderStart());
//     try {
//         const res = await axiosJWT.put('http://localhost:3001/api/order/' + userId, productOrder, {
//             headers: { token: `Bearer ${accessToken}` },
//         });
//         dispatch(updateOderSuccess(res.data));
//     } catch (error) {
//         dispatch(updateOderFailed());
//     }
// };
export const updateOrder = (userId, accessToken, productOrder, axiosJWT) => {
    return async (dispatch) => {
        dispatch(updateOderStart());
        try {
            const res = await axiosJWT.put(`http://localhost:3001/api/order/${userId}`, productOrder, {
                headers: { token: `Bearer ${accessToken}` },
            });
            dispatch(updateOderSuccess(res.data));
        } catch (error) {
            dispatch(updateOderFailed());
        }
    };
};
// export const updateQualityOrder = async (userId, dispatch, accessToken, productOrder, axiosOrder) => {
//     dispatch(updateQualityStart());
//     try {
//         const res = await axiosOrder.put('http://localhost:3001/api/order/quality/' + userId, productOrder, {
//             headers: { token: `Bearer ${accessToken}` },
//         });
//         dispatch(updateQualitySuccess(res.data));
//     } catch (error) {
//         dispatch(updateQualityFailed());
//     }
// };
export const updateQualityOrder = (userId, accessToken, productOrder, axiosOrder) => {
    return async (dispatch) => {
        dispatch(updateQualityStart());
        try {
            const res = await axiosOrder.put(`http://localhost:3001/api/order/quality/${userId}`, productOrder, {
                headers: { token: `Bearer ${accessToken}` },
            });
            dispatch(updateQualitySuccess(res.data));
        } catch (error) {
            dispatch(updateQualityFailed());
        }
    };
};
// export const deleteProductOrder = async (userId, dispatch, accessToken, productId, axiosDeleteOrder) => {
//     dispatch(deleteOrderStart());
//     try {
//         const res = await axiosDeleteOrder.put('http://localhost:3001/api/order/delete/' + userId, productId, {
//             headers: { token: `Bearer ${accessToken}` },
//         });
//         dispatch(deleteOrderSuccess(res.data));
//     } catch (error) {
//         dispatch(deleteOrderFailed());
//     }
// };

// actionCreators.js

export const deleteProductOrder = (userId, accessToken, productId, axiosDeleteOrder) => {
    return async (dispatch) => {
        dispatch(deleteOrderStart());
        try {
            const res = await axiosDeleteOrder.put('http://localhost:3001/api/order/delete/' + userId, productId, {
                headers: { token: `Bearer ${accessToken}` },
            });
            dispatch(deleteOrderSuccess(res.data));
        } catch (error) {
            dispatch(deleteOrderFailed());
        }
    };
};
