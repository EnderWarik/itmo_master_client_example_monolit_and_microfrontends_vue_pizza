import { init, loadRemote as loadRemoteMF } from '@module-federation/runtime';
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
        const mfRemotes = remotes.map((remote) => ({
            name: remote.name,
            entry: remote.entry,
            type: 'module' as const,
        }));

        init({
            name: 'shell',
            remotes: mfRemotes,
        });
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
