<template>
  <div :class="$style.pizza">
    <TextInput
      v-model="pizzaName"
      name="pizza_name"
      placeholder="Название пиццы"
    >
      <span class="visually-hidden">Название пиццы</span>
    </TextInput>

    <DropComponent @drop="emits('drop', $event)">
      <PizzaConstructor
        :size-id="selectedSizeId"
        :layers="fillings"
        :sauce-id="selectedSauceId"
      />
    </DropComponent>

    <ContentResult
      :total="totalPrice"
      :disabled="!pizzaName?.trim()"
      button-text="Готовьте!"
      @submit="emits('submit')"
    />
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";
import ContentResult from "@/components/content/ContentResult.vue";
import PizzaConstructor from "@/components/content/PizzaConstructor.vue";
import DropComponent from "@/common/components/DropComponent.vue";
import { IPizzaIngredient } from "@/components/types/IPizzaIngredient";

const pizzaName = defineModel<string>("pizzaName");

defineProps<{
  selectedSauceId: number;
  selectedSizeId: number;
  fillings: IPizzaIngredient[];
  totalPrice: number;
}>();

const emits = defineEmits<{
  drop: [value: string];
  submit: [];
}>();
</script>
<style module lang="scss">
.pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
