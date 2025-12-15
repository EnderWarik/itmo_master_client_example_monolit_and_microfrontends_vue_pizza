<template>
  <header :class="$style.header">
    <HeaderLogo />
    <HeaderCart :total-price="cartTotal" />
    <HeaderUser />
  </header>
  <slot />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import HeaderCart from "@/components/HeaderCart.vue";
import HeaderUser from "@/components/HeaderUser.vue";

const cartTotal = ref(0);

// Load cart total from localStorage on mount
function loadCartTotal() {
  try {
    const stored = localStorage.getItem("pizza_cart");
    if (stored) {
      const items = JSON.parse(stored);
      cartTotal.value = items.reduce((sum: number, item: any) => sum + (item.price * item.count), 0);
    }
  } catch {
    cartTotal.value = 0;
  }
}

function handleCartUpdate(event: Event) {
  const customEvent = event as CustomEvent;
  cartTotal.value = customEvent.detail?.total ?? 0;
}

onMounted(() => {
  loadCartTotal();
  window.addEventListener("cart:total-updated", handleCartUpdate);
});

onBeforeUnmount(() => {
  window.removeEventListener("cart:total-updated", handleCartUpdate);
});
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";

.header {
  position: relative;
  z-index: 2;
  display: flex;
  padding: 0 2.12%;
  background-color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-light;
}
</style>
