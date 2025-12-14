<template>
  <li :class="$style.item">
    <CartProduct
      :class="$style.product"
      :img="pizzaIcon"
      :img-width="56"
      :img-height="56"
      :name="item.name"
      :size="item.size"
      :dough="item.dough"
      :sauce="item.sauce"
      :count="item.count"
      :fillings="item.fillings"
    />

    <CounterComponent v-model="count" :class="$style.counter" />

    <div :class="$style.price">
      <b>{{ (item.count * item.price).toLocaleString() }} ₽</b>
    </div>

    <div :class="$style.button">
      <ButtonComponent
        type="button"
        variant="border"
        :class="$style.edit"
        @click="emits('edit')"
      >
        Изменить
      </ButtonComponent>
    </div>
  </li>
</template>

<script setup lang="ts">
import CartProduct from "./CartProduct.vue";
import CounterComponent from "@pizza/shared/common/components/CounterComponent.vue";
import ButtonComponent from "@pizza/shared/common/components/ButtonComponent.vue";
import pizzaIcon from "@pizza/shared/assets/img/product.svg";
import { IPizzaItem } from "@/types/pizza/IPizzaItem";

const count = defineModel<number>("count");
defineProps<{ item: IPizzaItem }>();

const emits = defineEmits<{
  edit: [];
}>();
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding: 0 15px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}

.product {
  flex-grow: 1;
  margin-right: auto;
}

.counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;
  text-align: right;

  b {
    @include ds-typography.b-s16-h19;
  }
}

.button {
  display: flex;
  align-items: center;
}

.edit {
  @include ds-typography.l-s11-h13;

  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: ds-colors.$green-500;
  }
  &:active {
    color: ds-colors.$green-600;
  }
  &:focus {
    color: ds-colors.$green-400;
  }
}
</style>
