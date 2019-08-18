import axios from 'axios';
import {TOKEN} from './login/setToken.helper';

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use((config: any) => {
    const token = localStorage.getItem(TOKEN);
    config.headers.Authorization =  token || '';
    return config;
});

export const AuthAPI = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
});
