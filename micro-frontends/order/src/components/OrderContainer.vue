<template>
  <main>
    <div v-if="orderStore.isLoading">Загрузка заказов...</div>
    <template v-else-if="orderStore.orders.length > 0">
      <OrderCard
        v-for="order in orderStore.orders"
        :key="order.id"
        :order-number="order.id"
        :total="order.total"
        :products="order.pizzas"
        :additionals="order.extras"
        :address="getCorrectAddress(order)"
        @delete="orderStore.deleteOrder(order.id)"
        @repeat="repeatOrder(order)"
      />
    </template>
    <div v-else :class="$style.empty">
      У вас пока нет заказов
    </div>
  </main>
</template>
<script setup lang="ts">
import OrderCard from "@/components/OrderCard.vue";
import { useOrderStore } from "@/stores/orderStore";
import concatAddress from "@/helpers/concatAddress";
import { IOrder } from "@/types/IOrder";
import { onMounted } from "vue";

function getCorrectAddress(order: IOrder) {
  if (order.address) return concatAddress(order.address);
  return null;
}
const orderStore = useOrderStore();

onMounted(() => {
  orderStore.init();
});

function repeatOrder(order: IOrder) {
  // Emit event for Shell to coordinate with cart MFE
  window.dispatchEvent(new CustomEvent("order:repeat", { detail: order }));
}
</script>
<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

@use "@pizza/shared/assets/scss/mixins/m_clear-list";

.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba(ds-colors.$green-500, 0.05);
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: ds-colors.$green-500;

  img {
    display: block;

    margin: 0 auto;
  }
}

.layout__link {
  @include ds-typography.b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: ds-colors.$black;

  &--active {
    background-color: rgba(ds-colors.$green-500, 0.1);
  }

  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }

  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.layout__address {
  margin-top: 16px;
}

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__additional {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;
}

.order__address {
  @include ds-typography.l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.empty {
  padding: 40px 20px;
  text-align: center;
  color: #888;
  font-size: 16px;
}
</style>
