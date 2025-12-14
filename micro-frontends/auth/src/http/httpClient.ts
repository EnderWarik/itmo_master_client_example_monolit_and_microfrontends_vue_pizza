import axios from "axios";
import { TokenStorage } from "@/utils/TokenStorage";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const httpClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use((config) => {
    const token = TokenStorage.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            TokenStorage.clear();
        }
        return Promise.reject(error);
    }
);
