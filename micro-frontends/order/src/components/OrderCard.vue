<template>
  <SheetComponent tag="section" :class="$style.order">
    <template #no-content>
      <OrderHeader
        :order-number="orderNumber"
        :total="total"
        @delete="$emit('delete')"
        @repeat="$emit('repeat')"
      />

      <OrderList :items="products" />

      <OrderAdditionalList v-if="additionals?.length" :items="additionals" />

      <p v-if="address" :class="$style.address">
        {{ address }}
      </p>
    </template>
  </SheetComponent>
</template>
<script setup lang="ts">
import SheetComponent from "@pizza/shared/common/components/SheetComponent.vue";
import OrderHeader from "./OrderHeader.vue";
import OrderList from "./OrderList.vue";
import OrderAdditionalList from "./OrderAdditionalList.vue";
import { IAdditionalCartItem } from "@/types/cart/IAdditionalCartItem";
import { IPizzaItem } from "@/types/pizza/IPizzaItem";

defineProps<{
  orderNumber: number | string;
  total: number;
  products: IPizzaItem[];
  additionals?: IAdditionalCartItem[];
  address?: string | null;
}>();

const emits = defineEmits<{
  delete: [];
  repeat: [];
}>();
</script>
<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.address {
  @include ds-typography.l-s11-h13;
  margin: 0;
  padding: 16px 10px;
  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
  position: relative;
}

.address::before {
  content: "Адрес доставки: ";
  font-weight: 400;
  margin-right: 6px;
}
</style>
