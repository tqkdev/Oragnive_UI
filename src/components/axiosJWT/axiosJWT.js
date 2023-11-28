import jwt_decode from 'jwt-decode';
import axios from 'axios';

// admin
const apirefreshTokenAdmin = async () => {
    try {
        const res = await axios.post(
            'http://localhost:3001/api/admin/refresh',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            { withCredentials: true },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createAxiosAdmin = (isCurrent, dispatch, stateSuccess) => {
    const newInstance = axios.create();

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(isCurrent.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await apirefreshTokenAdmin();
                const refreshAdmin = {
                    ...isCurrent,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshAdmin));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};

//  user
const apirefreshTokenUser = async () => {
    try {
        const res = await axios.post(
            'http://localhost:3001/api/user/refresh',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            { withCredentials: true },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createAxiosUser = (isCurrent, dispatch, stateSuccess) => {
    const newInstance = axios.create();

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(isCurrent.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await apirefreshTokenUser();
                const refreshUser = {
                    ...isCurrent,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
