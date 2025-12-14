<template>
  <div :class="$style.sauce">
    <p>Основной соус:</p>
    <RadioComponent
      v-for="sauce of sauces"
      :key="sauce.id"
      v-model="modelValue"
      :value="sauce.id"
      name="ingredients-sauce"
      :class="$style.input"
    >
      {{ sauce.name }}
    </RadioComponent>
  </div>
</template>
<script setup lang="ts">
import RadioComponent from "@/common/components/RadioComponent.vue";
import { IPizzaSauce } from "@/components/types/IPizzaSauce";

defineProps<{ sauces: IPizzaSauce[] }>();
const modelValue = defineModel<string | number | null>();
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";

.sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}
.input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
