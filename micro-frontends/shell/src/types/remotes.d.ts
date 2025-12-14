declare module 'auth/entry' {
    export function mount(el: HTMLElement): void;
    export function unmount(): void;
    export function initAuth(): Promise<any>;
}
