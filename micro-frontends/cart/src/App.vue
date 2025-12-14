<template>
  <div class="cart-wrapper">
    <CartContainer />
  </div>
</template>

<script setup lang="ts">
import CartContainer from "@/components/CartContainer.vue";
</script>

<style lang="scss">
@use "@pizza/shared/assets/scss/app.scss" as *;
</style>

<style module lang="scss">
.cart-wrapper {
  width: 100%;
}
</style>
