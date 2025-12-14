<template>
  <div :class="$style.filling">
    <p>Начинка:</p>

    <ul :class="$style.list">
      <IngredientItem
        v-for="ingredient of ingredients"
        :key="ingredient.id"
        v-model="ingredient.count"
        :class="$style.item"
        :image="ingredient.image"
        :ingredient="ingredient"
      />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { IPizzaIngredient } from "@/components/types/IPizzaIngredient";
import IngredientItem from "@/components/ingredient/components/IngredientItem.vue";

const ingredients = defineModel<IPizzaIngredient[]>("ingredients", {
  default: [],
});
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";

.item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
.filling {
  width: 100%;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
