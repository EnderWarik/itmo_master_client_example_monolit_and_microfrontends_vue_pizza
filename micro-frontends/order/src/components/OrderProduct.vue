<template>
  <div :class="$style.product">
    <img
      :src="img"
      :alt="name"
      :width="imgWidth ?? 56"
      :height="imgHeight ?? 56"
      :class="$style.img"
    />
    <div :class="$style.text">
      <h2 :class="$style.title">{{ name }}</h2>

      <p :class="$style.metaParagraph">
        <template v-if="size || dough">
          {{ size?.name || 'Стандартная' }}<template v-if="dough">, на {{ dough.name }} тесте</template><br />
        </template>
        <template v-if="sauce">
          Соус: {{ sauce.name }}<br />
        </template>
        <template v-if="fillings?.length">
          Начинка: {{ fillings.map((f) => f.name).join(", ") }}
        </template>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IPizzaItem } from "@/types/pizza/IPizzaItem";

defineProps<
  Partial<Omit<IPizzaItem, "id" | "price">> & {
    name: string;
    img: string;
    imgWidth?: number;
    imgHeight?: number;
  }
>();
</script>
<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";
@use "@pizza/shared/assets/scss/mixins/m_clear-list";
.product {
  display: flex;
  align-items: center;
}
.img {
  display: block;
  border-radius: 8px;
}
.text {
  margin-left: 15px;
}

.title {
  @include ds-typography.b-s18-h21;
  margin: 0 0 10px;
}

.metaList {
  @include ds-typography.b-s18-h21;

  margin-top: 0;
  margin-bottom: 10px;
}

.metaParagraph {
  @include m_clear-list.clear-list;
  @include ds-typography.l-s11-h13;
}
</style>
