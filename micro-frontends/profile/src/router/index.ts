import { createRouter, createWebHistory } from "vue-router";
import ProfileContainer from "@/components/ProfileContainer.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/profile",
            name: "profile",
            component: ProfileContainer,
        },
        {
            path: "/",
            redirect: "/profile"
        }
    ],
});

export default router;
