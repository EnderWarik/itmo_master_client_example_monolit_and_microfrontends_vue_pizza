import { createRouter, createWebHistory } from "vue-router";
import OrderContainer from "@/components/OrderContainer.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            // Match any path since this MFE is loaded inside Shell
            path: "/:pathMatch(.*)*",
            name: "orders",
            component: OrderContainer,
        },
    ],
});

export default router;
