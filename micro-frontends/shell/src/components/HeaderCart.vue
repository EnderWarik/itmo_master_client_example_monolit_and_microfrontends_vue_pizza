<template>
  <div :class="$style.cart">
    <router-link to="/cart">{{ totalPrice }} ₽</router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalPrice: number;
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include ds-typography.b-s16-h19;

    display: block;
    padding: 21px 15px 21px 58px;
    transition: 0.3s;
    color: ds-colors.$white;
    background-color: ds-colors.$green-500;
    background-image: url("@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}
</style>
