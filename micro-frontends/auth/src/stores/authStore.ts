import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TokenStorage } from "@/utils/TokenStorage";
import { authApi } from "@/api/authApi";
import type { User } from "@/types/User";

export const useAuthStore = defineStore("authStore", () => {
    const token = ref(TokenStorage.get());
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => !!token.value);

    async function login(email: string, password: string): Promise<boolean> {
        try {
            const response = await authApi.login({ email, password });
            token.value = response.token;
            TokenStorage.set(response.token);

            // Fetch user info
            await checkAuth();

            return true;
        } catch {
            return false;
        }
    }

    async function checkAuth() {
        if (!token.value) return;
        try {
            const userData = await authApi.whoAmI();
            user.value = userData;
            window.dispatchEvent(
                new CustomEvent("auth:login-success", { detail: userData })
            );
        } catch {
            clearToken();
            // Optional: emit auth:close if needed, but usually only on explicit logout
        }
    }

    async function logout() {
        try {
            await authApi.logout();
        } finally {
            clearToken();
            window.dispatchEvent(new Event("auth:close"));
        }
    }

    function clearToken() {
        token.value = null;
        user.value = null;
        TokenStorage.clear();
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout,
        checkAuth,
        clearToken,
    };
});
