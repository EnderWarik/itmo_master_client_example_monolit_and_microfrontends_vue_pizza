import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { IAdditionalCartItem } from "@/types/IAdditionalCartItem";
import { cartApi } from "@/api/cartApi";
import { BaseDeliveryEnum } from "@/types/BaseDeliveryEnum";

// Simplified pizza item type for cart
interface ICartPizzaItem {
  id: string;
  name: string;
  price: number;
  count: number;
  description?: string;
}

const CART_STORAGE_KEY = "pizza_cart";

export const useCartStore = defineStore("cartStore", () => {
  // Load cart from localStorage
  function loadFromStorage(): ICartPizzaItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Save cart to localStorage
  function saveToStorage(items: ICartPizzaItem[]) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  const cartItems = ref<ICartPizzaItem[]>(loadFromStorage());

  // Watch for changes and save to localStorage
  watch(
    () => cartItems.value,
    (items) => {
      saveToStorage(items);
      // Filter out items with count 0
      const filtered = items.filter((item) => item.count > 0);
      if (filtered.length !== items.length) {
        cartItems.value = filtered;
      }
    },
    { deep: true }
  );

  const isLoadingExtras = ref<boolean>(false);
  const extras = ref<IAdditionalCartItem[]>([]);

  const currentDelivery = ref<string>(BaseDeliveryEnum.new);
  const userPhone = ref<string>("");

  const totalPrice = computed(() => {
    let result = 0;
    cartItems.value.forEach((item) => (result += item.price * item.count));
    extras.value.forEach((item) => (result += item.price * item.count));
    return result;
  });

  function addPizzaItem(item: ICartPizzaItem) {
    cartItems.value.push(item);
  }

  function removeItem(id: string) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
  }

  function updateItemCount(id: string, count: number) {
    const item = cartItems.value.find((i) => i.id === id);
    if (item) {
      item.count = count;
    }
  }

  function resetCart(): void {
    cartItems.value = [];
    extras.value = extras.value.map((e) => ({ ...e, count: 0 }));
    currentDelivery.value = BaseDeliveryEnum.new;
  }

  async function init(): Promise<void> {
    try {
      isLoadingExtras.value = true;
      const extrasResp = await cartApi.getExtras();
      extras.value = extrasResp.map((item: any) => ({
        ...item,
        count: 0,
      }));
    } catch (e) {
      console.error("Failed to load extras:", e);
      extras.value = [];
    } finally {
      isLoadingExtras.value = false;
    }
  }

  async function orderPizzas(address: {
    street: string;
    building: string;
    flat?: string;
    comment?: string;
  }) {
    // TODO: Implement order creation via orderApi
    console.log("Order submitted:", {
      items: cartItems.value,
      extras: extras.value.filter((e) => e.count > 0),
      address,
      phone: userPhone.value,
    });

    // Clear cart after order
    resetCart();

    // Emit event for Shell to show success modal
    window.dispatchEvent(new CustomEvent("cart:order-complete"));
  }

  return {
    cartItems,
    extras,
    totalPrice,
    currentDelivery,
    userPhone,
    isLoadingExtras,
    addPizzaItem,
    removeItem,
    updateItemCount,
    orderPizzas,
    init,
    resetCart,
  };
});
