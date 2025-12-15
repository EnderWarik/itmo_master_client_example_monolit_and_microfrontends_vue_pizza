/**
 * Конфигурация remote микрофронтендов
 */
export interface RemoteConfig {
    name: string;
    entry: string;
    route: string;
    title: string;
}

const getEnvUrl = (key: string, defaultPort: number): string => {
    const envValue = import.meta.env[key];
    if (envValue) return envValue;

    // В development используем localhost с соответствующим портом
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    return `http://${host}:${defaultPort}`;
};

export const remotes: RemoteConfig[] = [
    {
        name: 'auth',
        entry: `${getEnvUrl('VITE_AUTH_URL', 5001)}/remoteEntry.js`,
        route: '/login',
        title: 'Авторизация',
    },
    {
        name: 'pizzaBuilder',
        entry: `${getEnvUrl('VITE_PIZZA_BUILDER_URL', 5002)}/remoteEntry.js`,
        route: '/',
        title: 'Конструктор пиццы',
    },
    {
        name: 'cart',
        entry: `${getEnvUrl('VITE_CART_URL', 5003)}/remoteEntry.js`,
        route: '/cart',
        title: 'Корзина',
    },
    {
        name: 'profile',
        entry: `${getEnvUrl('VITE_PROFILE_URL', 5004)}/remoteEntry.js`,
        route: '/profile',
        title: 'Профиль',
    },
    {
        name: 'order',
        entry: `${getEnvUrl('VITE_ORDER_URL', 5005)}/remoteEntry.js`,
        route: '/orders',
        title: 'История заказов',
    },
];

export default remotes;
