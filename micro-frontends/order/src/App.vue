<template>
  <div class="order-wrapper">
    <OrderContainer />
  </div>
</template>

<script setup lang="ts">
import OrderContainer from "@/components/OrderContainer.vue";
</script>

<style lang="scss">
@use "@pizza/shared/assets/scss/app.scss" as *;
</style>

<style module lang="scss">
.order-wrapper {
  width: 100%;
}
</style>
