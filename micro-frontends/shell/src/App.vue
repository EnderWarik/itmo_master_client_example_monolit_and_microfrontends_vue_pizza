<template>
  <div id="shell-app">
    <template v-if="showHeader">
      <HeaderComponent>
        <main class="main-content">
          <RouterView />
        </main>
      </HeaderComponent>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';

const router = useRouter();
const route = useRoute();

const showHeader = computed(() => !route.meta.noHeader);

function onLoginSuccess() {
  router.push('/');
}

function onAuthClose() {
  router.push('/');
}

onMounted(() => {
  window.addEventListener('auth:login-success', onLoginSuccess);
  window.addEventListener('auth:close', onAuthClose);
});

onBeforeUnmount(() => {
  window.removeEventListener('auth:login-success', onLoginSuccess);
  window.removeEventListener('auth:close', onAuthClose);
});
</script>

<style lang="scss">
@use "@/assets/scss/app" as *;
</style>
