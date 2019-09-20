import axios from 'axios';
import { TOKEN } from './login/setToken.helper';
import { history } from '../history';

export const AuthAPI = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

AuthAPI.interceptors.request.use((config: any) => {
    const token = localStorage.getItem(TOKEN);
    config.headers['x-access-token'] = token || '';
    return config;
});

AuthAPI.interceptors.response.use((response: any) => {
    return response;
}, (error: any) => {
    if (error.response.status === 401) {
        history.push('/logout');
    }
    if (error.response.status === 404) {
        history.push('/404');
    }
    return Promise.reject(error);
});

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
});
