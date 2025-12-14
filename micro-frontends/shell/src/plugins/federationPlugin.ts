import { init, registerRemotes, loadRemote as loadRemoteMF } from '@module-federation/runtime';
import type { App } from 'vue';
import type { RemoteConfig } from '@/config/remotes';

export interface MfeModule {
    name: string;
    mount: (container: HTMLElement) => void;
    unmount: () => void;
}

/**
 * Vue плагин для инициализации Module Federation runtime
 */
export const federationPlugin = {
    install: (_app: App, remotes: RemoteConfig[]) => {
        // Auth инициализируется статически через vite.config.ts,
        // поэтому исключаем его из динамической инициализации чтобы избежать конфликтов
        const dynamicRemotes = remotes.filter(r => r.name !== 'auth');

        const mfRemotes = dynamicRemotes.map((remote) => ({
            name: remote.name,
            entry: remote.entry,
            type: 'module' as const,
        }));

        // Используем registerRemotes вместо init, так как init уже мог быть вызван
        // (например, плагином Vite для статических remotes)
        registerRemotes(mfRemotes);
    },
};

/**
 * Загрузить remote модуль
 */
export const loadRemote = async (moduleName: string): Promise<MfeModule | null> => {
    try {
        const loadedModule = await loadRemoteMF<{
            mount: (container: HTMLElement) => void;
            unmount: () => void;
        }>(`${moduleName}/entry`);

        if (!loadedModule) {
            console.error(`Failed to load module: ${moduleName}`);
            return null;
        }

        return {
            name: moduleName,
            mount: loadedModule.mount,
            unmount: loadedModule.unmount,
        };
    } catch (error) {
        console.error(`Error loading remote module ${moduleName}:`, error);
        return null;
    }
};

export default federationPlugin;
