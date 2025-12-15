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
      :addresses="userAddresses"
    />

    <CartFooter
      :total="cartStore.totalPrice"
      :disabled="isSubmitDisabled"
      @submit="onOrder"
      @more="goToBuilder"
    />

    <OrderThanksModal v-model="isThanksOpen" @close="onModalClose" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import TitleComponent from "@pizza/shared/common/components/TitleComponent.vue";
import CartForm from "@/components/CartForm.vue";
import CartList from "@/components/CartList.vue";
import CartFooter from "@/components/CartFooter.vue";
import AdditionalList from "@/components/AdditionalList.vue";
import OrderThanksModal from "@/components/OrderThanksModal.vue";
import { useCartStore } from "@/stores/cartStore";
import { BaseDeliveryEnum } from "@/types/BaseDeliveryEnum";
import { profileApi, type IAddress } from "@/api/profileApi";

const cartStore = useCartStore();

// Local address form
const addressForm = ref({
  street: "",
  building: "",
  flat: "",
  comment: "",
});

// User addresses from API
const userAddresses = ref<IAddress[]>([]);
const addresses = computed(() => 
  userAddresses.value.map(a => ({ 
    id: a.id, 
    name: a.name || `${a.street}, ${a.building}` 
  }))
);

const isThanksOpen = ref(false);

// Form validation - phone required, address required for delivery
const isSubmitDisabled = computed(() => {
  if (!cartStore.userPhone?.trim()) return true;
  if (cartStore.currentDelivery === BaseDeliveryEnum.self) return false;
  return !addressForm.value.street?.trim() || !addressForm.value.building?.trim();
});

// Get userId from localStorage (set by auth MFE)
function getUserId(): string {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.id?.toString() || "0";
    }
  } catch {}
  return "0";
}

function goToBuilder() {
  window.history.pushState({}, "", "/");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

async function loadAddresses() {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      userAddresses.value = await profileApi.getAddresses();
    }
  } catch (e) {
    console.error("Failed to load addresses:", e);
    userAddresses.value = [];
  }
}

// Watch delivery type - fill form from selected saved address
watch(() => cartStore.currentDelivery, (val) => {
  if (val !== BaseDeliveryEnum.new && val !== BaseDeliveryEnum.self) {
    const addr = userAddresses.value.find(a => a.id === parseInt(val));
    if (addr) {
      addressForm.value = {
        street: addr.street,
        building: addr.building,
        flat: addr.flat || "",
        comment: addr.comment || "",
      };
    }
  } else if (val === BaseDeliveryEnum.new) {
    addressForm.value = { street: "", building: "", flat: "", comment: "" };
  }
});

onMounted(() => {
  cartStore.init();
  loadAddresses();
});

function onEdit(id: string) {
  // Emit event for Shell to coordinate with pizza-builder MFE
  window.dispatchEvent(new CustomEvent("cart:edit-pizza", { detail: { id } }));
}

async function onOrder() {
  try {
    await cartStore.orderPizzas(getUserId(), addressForm.value);
    isThanksOpen.value = true;
  } catch (error) {
    console.error("Order failed:", error);
    alert("Ошибка при оформлении заказа");
  }
}

function onModalClose() {
  // Check if user is authenticated
  const token = localStorage.getItem("access_token");
  if (token) {
    // Redirect to orders via shell navigation
    window.history.pushState({}, "", "/orders");
    window.dispatchEvent(new PopStateEvent("popstate"));
  } else {
    // Redirect to home
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
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
