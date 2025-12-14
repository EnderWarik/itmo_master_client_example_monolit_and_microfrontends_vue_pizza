<template>
  <div :class="$style.product">
    <img
      :src="img"
      :alt="name"
      :width="imgWidth"
      :height="imgHeight"
      :class="$style.img"
    />
    <div :class="$style.text">
      <h2 :class="$style.title">{{ name }}</h2>
      <ul :class="$style.meta">
        <li>
          {{ toInstrumental(size?.name) }}, на
          {{ toInstrumental(dough?.name) }} тесте
        </li>
        <li>Соус: {{ sauce?.name }}</li>
        <li v-if="fillings?.length">
          Начинка: {{ fillings.map((fl) => fl.name).join(", ") }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPizzaIngredient } from "@/types/pizza/IPizzaIngredient";
import { IPizzaSauce } from "@/types/pizza/IPizzaSauce";
import { IPizzaDough } from "@/types/pizza/IPizzaDough";
import { IPizzaSize } from "@/types/pizza/IPizzaSize";

function toInstrumental(form: string | undefined): string {
  if (!form) return "";
  if (form.endsWith("ое")) {
    return form.toLowerCase().slice(0, -2) + "ом";
  }
  return form;
}

defineProps<{
  img: string;
  imgWidth: number;
  imgHeight: number;
  name: string;
  size: IPizzaSize | null;
  dough: IPizzaDough | null;
  sauce: IPizzaSauce | null;
  count: number;
  fillings: IPizzaIngredient[];
}>();
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.product {
  display: flex;
  align-items: center;
}
.img {
  border-radius: 8px;
}
.text {
  margin-left: 15px;
}
.title {
  @include ds-typography.b-s18-h21;
  margin: 0 0 10px;
}
.meta {
  @include ds-typography.l-s11-h13;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
