import { createRouter, createWebHistory } from "vue-router";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import SidebarHeaderLayout from "@/layouts/SidebarHeaderLayout.vue";
import { authMiddleware } from "@/router/routerGuards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        layout: HeaderLayout,
        public: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        public: true,
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
      meta: {
        layout: HeaderLayout,
        public: true,
      },
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("@/views/OrdersView.vue"),
      meta: {
        layout: SidebarHeaderLayout,
        title: "История заказов",
        links: [
          { label: "История заказов", href: "/orders" },
          { label: "Мои данные", href: "/profile" },
        ],
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        layout: SidebarHeaderLayout,
        title: "Мои данные",
        links: [
          { label: "История заказов", href: "/orders" },
          { label: "Мои данные", href: "/profile" },
        ],
      },
    },
  ],
});

export default router;
router.beforeEach(authMiddleware);
