<template>
  <SheetComponent tag="li" :class="$style.item">
    <p :class="$style.description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div :class="$style.wrapper">
      <CounterComponent v-model="count" :class="$style.counter" />
      <div :class="$style.price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </SheetComponent>
</template>
<script setup lang="ts">
import CounterComponent from "@pizza/shared/common/components/CounterComponent.vue";
import SheetComponent from "@pizza/shared/common/components/SheetComponent.vue";

import { IAdditionalCartItem } from "@/types/IAdditionalCartItem";

const count = defineModel<number>("count");

defineProps<{ item: IAdditionalCartItem }>();
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";
@use "@pizza/shared/assets/scss/ds-system/ds-colors";

.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 15px 0;
}

.description {
  display: flex;
  align-items: center;
  margin: 0 0 8px;

  img {
    margin: 0 10px 0 15px;
  }

  span {
    @include ds-typography.b-s14-h16;
    display: inline-block;
    width: 100px;
    margin-right: 15px;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding: 18px 15px 0;
  box-sizing: border-box;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.counter {
  width: 54px;
  margin-right: auto;
}

.price {
  @include ds-typography.b-s16-h19;
}
</style>
