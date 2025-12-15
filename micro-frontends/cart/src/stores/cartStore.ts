import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { IAdditionalCartItem } from "@/types/IAdditionalCartItem";
import { cartApi } from "@/api/cartApi";
import { orderApi } from "@/api/orderApi";
import { BaseDeliveryEnum } from "@/types/BaseDeliveryEnum";

// Full pizza item type for cart (matches IPizzaItem structure)
interface ICartPizzaItem {
  id: string;
  name: string;
  price: number;
  count: number;
  size?: {
    id: number;
    name: string;
    image: string;
    multiplier: number;
  };
  dough?: {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
  };
  sauce?: {
    id: number;
    name: string;
    price: number;
  };
  fillings?: {
    id: number;
    name: string;
    price: number;
    image: string;
    count?: number;
  }[];
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

  // Save cart to localStorage and notify shell
  function saveToStorage(items: ICartPizzaItem[]) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Calculate and emit total for header
    const total = items.reduce((sum, item) => sum + (item.price * item.count), 0);
    window.dispatchEvent(new CustomEvent("cart:total-updated", { detail: { total } }));
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

  // Watch extras for changes and emit total update
  watch(
    () => extras.value,
    () => {
      window.dispatchEvent(new CustomEvent("cart:total-updated", { detail: { total: totalPrice.value } }));
    },
    { deep: true }
  );

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

  async function orderPizzas(userId: string, address: {
    street: string;
    building: string;
    flat?: string;
    comment?: string;
  } | null) {
    const pizzasPayload = cartItems.value.map((p) => ({
      name: p.name,
      sauceId: p.sauce?.id ?? 0,
      doughId: p.dough?.id ?? 0,
      sizeId: p.size?.id ?? 0,
      quantity: p.count,
      ingredients: (p.fillings ?? []).map((f) => ({
        ingredientId: f.id,
        quantity: f.count ?? 1,
      })),
    }));

    const miscPayload = extras.value
      .filter((e) => e.count > 0)
      .map((e) => ({ miscId: e.id, quantity: e.count }));

    await orderApi.createOrder({
      userId,
      phone: userPhone.value,
      address,
      pizzas: pizzasPayload,
      misc: miscPayload,
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
