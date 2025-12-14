<template>
  <ul :class="$style.list">
    <OrderAdditionalItem v-for="it in items" :key="it.id" v-bind="it" />
  </ul>
</template>
<script setup lang="ts">
import OrderAdditionalItem from "./OrderAdditionalItem.vue";

import { IAdditionalCartItem } from "@/types/cart/IAdditionalCartItem";

defineProps<{ items: IAdditionalCartItem[] }>();
</script>
<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";
@use "@pizza/shared/assets/scss/mixins/m_clear-list";

.list {
  @include m_clear-list.clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding-left: 80px;
}
</style>
