import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

/**
 * Роуты Shell приложения
 * Каждый роут загружает соответствующий микрофронтенд через MfeLoader
 */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/MfeView.vue'),
        meta: {
            title: 'Главная',
            mfe: 'pizzaBuilder',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/MfeView.vue'),
        meta: {
            title: 'Авторизация',
            mfe: 'auth',
            noHeader: true,
        },
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/MfeView.vue'),
        meta: {
            title: 'Корзина',
            mfe: 'cart',
        },
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('@/views/MfeView.vue'),
        meta: {
            title: 'Оформление заказа',
            mfe: 'order',
        },
    },
    {
        path: '/orders',
        name: 'orders',
        component: () => import('@/views/MfeView.vue'),
        meta: {
            title: 'История заказов',
            mfe: 'order',
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/MfeView.vue'),
        meta: {
            title: 'Профиль',
            mfe: 'profile',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Обновляем title страницы при навигации
router.beforeEach((to, _from, next) => {
    const title = to.meta.title as string;
    if (title) {
        document.title = `${title} | Pizza App`;
    }
    next();
});

export default router;
