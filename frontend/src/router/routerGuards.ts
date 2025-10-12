import type { RouteLocationNormalized } from "vue-router";

import { useAuthStore } from "@/modules/auth/authStore";

function isPublicRoute(to: RouteLocationNormalized): boolean {
  return Boolean(to.meta?.public);
}

export const authMiddleware = (to: RouteLocationNormalized) => {
  const auth = useAuthStore();
  if (to.path === "/login" && auth.isAuthenticated) {
    return { name: "home" };
  }

  if (!isPublicRoute(to) && !auth.isAuthenticated) {
    return { path: "/login", query: { redirect: to.fullPath } };
  }

  return true;
};
