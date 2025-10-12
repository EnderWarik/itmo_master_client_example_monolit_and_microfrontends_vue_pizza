import { defineStore } from "pinia";
import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalCartItem } from "@/modules/cart/types/IAdditionalCartItem";
import { computed, ref, watch } from "vue";
import { mapWithCount } from "@/helpers/mappers";
import { BaseDeliveryEnum } from "@/modules/cart/types/BaseDeliveryEnum";
import { useProfileStore } from "@/modules/profile/profileStore";
import { cartApi } from "@/modules/cart/cartApi";
import { IOrder } from "@/modules/order/types/IOrder";
import { orderApi } from "@/modules/order/orderApi";

export const useCartStore = defineStore("cartStore", () => {
  const profileStore = useProfileStore();

  const cartItems = ref<IPizzaItem[]>([]);
  watch(
    () => cartItems.value.map((item) => item.count),
    () => {
      const filtered = cartItems.value.filter((item) => item.count > 0);
      if (filtered.length !== cartItems.value.length) {
        cartItems.value = filtered;
      }
    },
    { flush: "post" },
  );
  const isLoadingExtras = ref<boolean>(false);
  const extras = ref<IAdditionalCartItem[]>([]);

  const currentDelivery = ref<string>(BaseDeliveryEnum.new);
  const totalPrice = computed(() => {
    let result = 0;
    cartItems.value.forEach((item) => (result += item.price * item.count));

    extras.value.forEach((item) => (result += item.price * item.count));

    return result;
  });

  function addPizzaItem(item: IPizzaItem) {
    cartItems.value.push(item);
  }
  const userPhone = ref<string>("");
  function resetCart(): void {
    cartItems.value = [];
    extras.value = extras.value.map((e) => ({ ...e, count: 0 }));
    currentDelivery.value = BaseDeliveryEnum.new;
    userPhone.value = profileStore.user?.phone || "";
  }

  async function init(): Promise<void> {
    try {
      isLoadingExtras.value = true;
      const extrasResp = await cartApi.getExtras();
      extras.value = mapWithCount(extrasResp).map((item) => ({
        ...item,
        count: 0,
      }));
      userPhone.value = profileStore.user?.phone || "";
    } finally {
      isLoadingExtras.value = false;
    }
  }

  async function orderPizzas() {
    let userId = profileStore.user?.id;
    if (!userId) userId = "0";

    const form = profileStore.addressForm;

    let addressPayload: {
      street: string;
      building: string;
      flat?: string;
      comment?: string;
    } | null = null;

    if (currentDelivery.value === BaseDeliveryEnum.new) {
      addressPayload = {
        street: form.street,
        building: form.building,
        flat: form.flat || "",
        comment: form.comment || "",
      };
    } else {
      const selectedAddress = profileStore.addresses.find(
        (address) => address.id === parseFloat(currentDelivery.value),
      );
      if (selectedAddress) {
        addressPayload = {
          street: selectedAddress.street,
          building: selectedAddress.building,
          flat: selectedAddress.flat || "",
          comment: selectedAddress.comment || "",
        };
      }
    }

    const pizzasPayload = cartItems.value.map((p) => ({
      name: p.name,
      sauceId: p.sauce?.id ?? 0,
      doughId: p.dough?.id ?? 0,
      sizeId: p.size?.id ?? 0,
      quantity: p.count,
      ingredients: p.fillings.map((f) => ({
        ingredientId: f.id,
        quantity: f.count,
      })),
    }));

    const miscPayload = extras.value
      .filter((e) => e.count > 0)
      .map((e) => ({ miscId: e.id, quantity: e.count }));

    await orderApi.createOrder({
      userId,
      phone: userPhone.value,
      address: addressPayload,
      pizzas: pizzasPayload,
      misc: miscPayload,
    });

    cartItems.value = [];
    extras.value = extras.value.map((e) => ({ ...e, count: 0 }));
    // await orderStore.init();
  }

  function loadOrder(order: IOrder) {
    cartItems.value = order.pizzas.map((p) => ({ ...p }));

    const byId = new Map(
      (order.extras ?? []).map((e) => [e.id, e.count] as const),
    );
    extras.value = extras.value.map((e) => ({
      ...e,
      count: byId.get(e.id) ?? 0,
    }));

    if (order.phone) {
      userPhone.value = order.phone;
    }

    if (!order.address) {
      currentDelivery.value = BaseDeliveryEnum.self;
      const form = profileStore.addressForm;
      form.street = "";
      form.building = "";
      form.flat = "";
      form.comment = "";
    } else {
      const matched = profileStore.addresses.find(
        (a) => a.id === order.address!.id,
      );
      if (matched) {
        currentDelivery.value = matched.id.toString();
        const form = profileStore.addressForm;
        form.street = matched.street;
        form.building = matched.building;
        form.flat = matched.flat || "";
        form.comment = matched.comment || "";
      } else {
        currentDelivery.value = BaseDeliveryEnum.new;
        const form = profileStore.addressForm;
        form.street = order.address.street;
        form.building = order.address.building;
        form.flat = order.address.flat || "";
        form.comment = order.address.comment || "";
      }
    }
  }

  return {
    cartItems,
    extras,
    totalPrice,
    currentDelivery,
    userPhone,
    addPizzaItem,
    orderPizzas,
    loadOrder,
    isLoadingExtras,
    init,
    resetCart,
  };
});
