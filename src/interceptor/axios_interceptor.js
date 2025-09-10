import axios from 'axios';
import {BASE_URL, JWT_TOKEN_KEY} from "../config.js";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-App-Id': 'HABIT_COACH',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(JWT_TOKEN_KEY);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.response || error.message);
        if (error.response?.status === 401) {
            localStorage.removeItem(JWT_TOKEN_KEY);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;