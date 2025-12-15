<template>
  <div class="mfe-container" ref="containerRef">
    <div v-if="loading" class="mfe-loading">
      <div class="spinner"></div>
      <span>Загрузка модуля...</span>
    </div>
    <div v-else-if="error" class="mfe-error">
      <span>⚠️ Ошибка загрузки: {{ error }}</span>
      <button @click="retry">Повторить</button>
    </div>
    <div ref="mfeRoot" class="mfe-root"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { loadRemote, type MfeModule } from '@/plugins/federationPlugin';

const props = defineProps<{
  moduleName: string;
}>();

const containerRef = ref<HTMLElement | null>(null);
const mfeRoot = ref<HTMLElement | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
let currentModule: MfeModule | null = null;

const mountModule = async () => {
  loading.value = true;
  error.value = null;

  console.log('[MfeLoader] Mounting module:', props.moduleName);

  try {
    // Сначала размонтируем предыдущий модуль
    if (currentModule) {
      currentModule.unmount();
      currentModule = null;
    }

    console.log('[MfeLoader] Loading remote:', props.moduleName);
    const module = await loadRemote(props.moduleName);
    console.log('[MfeLoader] Loaded module:', module);
    
    if (module && mfeRoot.value) {
      currentModule = module;
      module.mount(mfeRoot.value);
      console.log('[MfeLoader] Mounted:', props.moduleName);
    } else {
      error.value = `Модуль "${props.moduleName}" не найден`;
      console.error('[MfeLoader] Module not found:', props.moduleName);
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Неизвестная ошибка';
    console.error('[MfeLoader] Error:', e);
  } finally {
    loading.value = false;
  }
};

const retry = () => {
  mountModule();
};

watch(() => props.moduleName, () => {
  mountModule();
});

onMounted(() => {
  mountModule();
});

onBeforeUnmount(() => {
  if (currentModule) {
    currentModule.unmount();
    currentModule = null;
  }
});
</script>

<style scoped lang="scss">
.mfe-container {
  min-height: 200px;
  position: relative;
}

.mfe-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 16px;
  color: #666;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #ff6b00;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.mfe-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 16px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;

  button {
    padding: 8px 16px;
    background: #ff6b00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #e65c00;
    }
  }
}

.mfe-root {
  width: 100%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
