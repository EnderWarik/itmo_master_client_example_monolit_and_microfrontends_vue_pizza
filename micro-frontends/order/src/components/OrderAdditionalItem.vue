<template>
  <li :class="$style.item">
    <img
      :src="image"
      :width="20"
      :height="30"
      :alt="name"
      :class="$style.img"
    />
    <p :class="$style.text">
      <span :class="$style.title">{{ name }}</span>
      <b :class="$style.price">{{ price }} ₽</b>
    </p>
  </li>
</template>
<script setup lang="ts">
import { IAdditionalCartItem } from "@/types/cart/IAdditionalCartItem";

type Props = Omit<IAdditionalCartItem, "id">;
defineProps<Props>();
</script>
<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.item {
  width: 130px;
  margin-right: 24px;
  margin-bottom: 10px;
}

.img {
  float: left;
  margin-right: 7px;
  display: block;
}

.text {
  margin: 0;
}

.title {
  @include ds-typography.b-s11-h16;
  display: inline;
}

.price {
  display: block;
}
</style>
