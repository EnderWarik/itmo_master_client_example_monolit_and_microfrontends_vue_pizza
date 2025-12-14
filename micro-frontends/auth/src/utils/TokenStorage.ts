import { ACCESS_KEY } from "@/constants";

export const TokenStorage = {
    get(): string | null {
        return localStorage.getItem(ACCESS_KEY);
    },
    set(token: string | null) {
        if (token) localStorage.setItem(ACCESS_KEY, token);
        else localStorage.removeItem(ACCESS_KEY);
    },
    clear() {
        localStorage.removeItem(ACCESS_KEY);
    },
};
