import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TokenStorage } from "@/utils/TokenStorage";
import { authApi } from "@/api/authApi";

export const useAuthStore = defineStore("authStore", () => {
    const token = ref(TokenStorage.get());
    const isAuthenticated = computed(() => !!token.value);

    async function login(email: string, password: string): Promise<boolean> {
        try {
            const response = await authApi.login({ email, password });
            token.value = response.token;
            TokenStorage.set(response.token);
            return true;
        } catch {
            return false;
        }
    }

    async function logout() {
        try {
            await authApi.logout();
        } finally {
            clearToken();
        }
    }

    function clearToken() {
        token.value = null;
        TokenStorage.clear();
    }

    return {
        token,
        isAuthenticated,
        login,
        logout,
        clearToken,
    };
});
