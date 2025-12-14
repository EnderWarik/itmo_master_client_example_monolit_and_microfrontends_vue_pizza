<template>
  <div class="mfe-view">
    <MfeLoader :module-name="moduleName" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MfeLoader from '@/components/MfeLoader.vue';

const route = useRoute();

const moduleName = computed(() => {
  return route.meta.mfe as string || '';
});
</script>

<style scoped>
.mfe-view {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>
