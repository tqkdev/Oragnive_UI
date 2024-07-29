import axios from 'axios';

const request = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BACKEND}/`,
});
export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
