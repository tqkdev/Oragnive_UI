import jwt_decode from 'jwt-decode';
import axios from 'axios';

// admin
const apirefreshTokenAdmin = async (adminid) => {
    try {
        const res = await axios.post(
            'http://localhost:3001/api/admin/refresh',
            { adminid: `${adminid}` },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
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
            const decodedToken = jwt_decode(isCurrent.data.accessToken);

            if (decodedToken.exp < date.getTime() / 1000) {
                try {
                    const data = await apirefreshTokenAdmin(isCurrent.data._id);
                    const refreshAdmin = {
                        ...isCurrent,
                        data: {
                            ...isCurrent.data,
                            accessToken: data.data.accessToken,
                        },
                    };

                    dispatch(stateSuccess(refreshAdmin));
                    config.headers['token'] = 'Bearer ' + data.data.accessToken;
                } catch (error) {
                    // Xử lý lỗi làm mới token nếu cần
                }
            } else {
                config.headers['token'] = 'Bearer ' + isCurrent.data.accessToken;
            }
            return config;
        },
        (err) => Promise.reject(err),
    );

    return newInstance;
};

//  user

const apirefreshTokenUser = async (userid) => {
    try {
        const res = await axios.post(
            'http://localhost:3001/api/user/refresh',
            { userid: `${userid}` },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
        );
        return res.data; // Đảm bảo trả về dữ liệu đúng cách
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

export const createAxiosUser = (isCurrent, dispatch, stateSuccess) => {
    const newInstance = axios.create();

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(isCurrent.data.accessToken);

            if (decodedToken.exp < date.getTime() / 1000) {
                try {
                    const data = await apirefreshTokenUser(isCurrent.data._id);
                    const refreshUser = {
                        ...isCurrent,
                        data: {
                            ...isCurrent.data,
                            accessToken: data.data.accessToken,
                        },
                    };

                    dispatch(stateSuccess(refreshUser));
                    config.headers['token'] = 'Bearer ' + data.data.accessToken;
                } catch (error) {
                    // Xử lý lỗi làm mới token nếu cần
                }
            } else {
                config.headers['token'] = 'Bearer ' + isCurrent.data.accessToken;
            }
            return config;
        },
        (err) => Promise.reject(err),
    );

    return newInstance;
};
