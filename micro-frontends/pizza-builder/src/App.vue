<template>
  <main :class="$style.content">
    <PizzaContainer />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import PizzaContainer from '@/components/PizzaContainer.vue';
import { usePizzaStore } from '@/stores/pizzaStore';

const pizzaStore = usePizzaStore();

onMounted(async () => {
  await pizzaStore.init();
});
</script>

<style lang="scss">
@use "@/assets/scss/app" as *;
</style>

<style module lang="scss">
.content {
  padding-top: 20px;
}
</style>
