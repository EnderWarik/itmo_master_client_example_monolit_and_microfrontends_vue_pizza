import { createRouter, createWebHistory } from "vue-router";
import CartContainer from "@/components/CartContainer.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/cart",
            name: "cart",
            component: CartContainer,
        },
        {
            path: "/",
            redirect: "/cart"
        }
    ],
});

export default router;
