<template>
  <div :class="$style.cartContainer">
    <TitleComponent :class="$style.title" tag="h1"> Корзина </TitleComponent>

    <CartList :items="cartStore.cartItems" @edit="onEdit" />

    <div v-if="cartStore.isLoadingExtras" :class="$style.empty">
      Загрузка товаров...
    </div>
    <AdditionalList
      v-else
      :class="$style.additional"
      :items="cartStore.extras"
    />

    <CartForm
      v-model:delivery="cartStore.currentDelivery"
      v-model:street="addressForm.street"
      v-model:house="addressForm.building"
      v-model:apartment="addressForm.flat"
      v-model:phone="cartStore.userPhone"
      :addresses="addresses"
    />

    <CartFooter
      :total="cartStore.totalPrice"
      @order="onOrder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TitleComponent from "@pizza/shared/common/components/TitleComponent.vue";
import CartForm from "@/components/CartForm.vue";
import CartList from "@/components/CartList.vue";
import CartFooter from "@/components/CartFooter.vue";
import AdditionalList from "@/components/AdditionalList.vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

// Local address form (simplified - no profileStore dependency)
const addressForm = ref({
  street: "",
  building: "",
  flat: "",
  comment: "",
});

// Empty addresses for now (would be fetched from API in full implementation)
const addresses = ref<Array<{ id: number; name: string }>>([]);

onMounted(() => {
  cartStore.init();
});

function onEdit(id: string) {
  // Emit event for Shell to coordinate with pizza-builder MFE
  window.dispatchEvent(new CustomEvent("cart:edit-pizza", { detail: { id } }));
}

function onOrder() {
  cartStore.orderPizzas(addressForm.value);
}
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.cartContainer {
  width: 100%;
}
.title {
  margin-bottom: 15px;
}

.additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.empty {
  padding: 20px 30px;
}
</style>
