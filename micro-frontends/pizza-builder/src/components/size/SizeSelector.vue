<template>
  <div :class="$style.diameter">
    <SheetComponent title="Выберите размер">
      <SizeOption
        v-for="size of pizzaSizes"
        :key="size.id"
        v-model="modelValue"
        :value="size.id"
        :title="size.name"
        :modifier="PizzaSizeEnum[size.id]"
        name="diameter"
      />
    </SheetComponent>
  </div>
</template>
<script setup lang="ts">
import { SheetComponent } from "@pizza/shared";
import { IPizzaSize } from "@/components/types/IPizzaSize";
import SizeOption from "@/components/size/components/SizeOption.vue";
import { PizzaSizeEnum } from "@/types/enums/PizzaSizeEnum";

defineProps<{
  pizzaSizes: IPizzaSize[];
}>();
const modelValue = defineModel<number | null>();
</script>

<style module lang="scss">
.diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
