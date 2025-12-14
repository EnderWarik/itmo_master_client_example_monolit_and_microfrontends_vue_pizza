import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TOKEN_KEY = "access_token";

export const httpClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
        }
        return Promise.reject(error);
    }
);
