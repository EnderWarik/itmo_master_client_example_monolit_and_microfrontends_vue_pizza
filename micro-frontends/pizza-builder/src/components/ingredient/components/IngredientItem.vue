<template>
  <li :class="$style.item">
    <DragComponent :transfer-data="ingredient" :disabled="modelValue >= 3">
      <span
        :class="$style.filling"
        :style="{
          '--icon-url': `url(${image})`,
        }"
      >
        {{ ingredient.name }}
      </span>
    </DragComponent>
    <CounterComponent
      v-model="modelValue"
      :class="$style.counter"
      :max="3"
      :min="0"
    />
  </li>
</template>

<script setup lang="ts">
import { IPizzaIngredient } from "@/components/types/IPizzaIngredient";
import CounterComponent from "@/common/components/CounterComponent.vue";
import DragComponent from "@/common/components/DragComponent.vue";

defineProps<{
  ingredient: IPizzaIngredient;
  image: string;
}>();
const modelValue = defineModel<number>({ default: 0 });
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

.counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include ds-typography.r-s14-h16;

  position: relative;
  display: block;
  padding-left: 36px;

  &::before {
    @include m_center.p_center-v;
    background-image: var(--icon-url);

    display: block;
    width: 32px;
    height: 32px;

    content: "";
    border-radius: 50%;
    background-color: ds-colors.$white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
}
</style>
