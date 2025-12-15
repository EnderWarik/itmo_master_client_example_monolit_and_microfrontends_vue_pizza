/**
 * MFE Preloader Service
 * Загружает все MFE модули в фоновом режиме для быстрой коммуникации
 */
import { loadRemote, type MfeModule } from './federationPlugin';
import { remotes } from '@/config/remotes';

interface PreloadedMfe {
    name: string;
    module: MfeModule | null;
    loaded: boolean;
    listeners: Set<(event: CustomEvent) => void>;
}

// Хранилище предзагруженных модулей
const preloadedMfes = new Map<string, PreloadedMfe>();

// Флаг готовности
let isPreloaded = false;

/**
 * Предзагрузить все MFE модули
 */
export async function preloadAllMfes(): Promise<void> {
    if (isPreloaded) return;

    console.log('[MfePreloader] Starting background preload of all MFEs...');

    const loadPromises = remotes.map(async (remote) => {
        try {
            console.log(`[MfePreloader] Loading ${remote.name}...`);
            const module = await loadRemote(remote.name);

            // Call init() if module exports it (for setting up event listeners)
            if (module && module.init) {
                module.init();
                console.log(`[MfePreloader] ✓ ${remote.name} initialized`);
            }

            preloadedMfes.set(remote.name, {
                name: remote.name,
                module,
                loaded: true,
                listeners: new Set(),
            });

            console.log(`[MfePreloader] ✓ ${remote.name} loaded`);
        } catch (error) {
            console.warn(`[MfePreloader] Failed to preload ${remote.name}:`, error);
            preloadedMfes.set(remote.name, {
                name: remote.name,
                module: null,
                loaded: false,
                listeners: new Set(),
            });
        }
    });

    await Promise.allSettled(loadPromises);
    isPreloaded = true;
    console.log('[MfePreloader] All MFEs preloaded');

    // Dispatch event that preloading is complete
    window.dispatchEvent(new CustomEvent('mfe:preload-complete'));
}

/**
 * Получить предзагруженный MFE модуль
 */
export function getPreloadedMfe(name: string): MfeModule | null {
    return preloadedMfes.get(name)?.module ?? null;
}

/**
 * Проверить загружен ли MFE
 */
export function isMfeLoaded(name: string): boolean {
    return preloadedMfes.get(name)?.loaded ?? false;
}

/**
 * Проверить завершена ли предзагрузка всех MFE
 */
export function isPreloadComplete(): boolean {
    return isPreloaded;
}

export default {
    preloadAllMfes,
    getPreloadedMfe,
    isMfeLoaded,
    isPreloadComplete,
};
