import { defineStore } from "pinia";
import { ref } from "vue";
import { IOrder } from "@/types/IOrder";
import { orderApi } from "@/api/orderApi";

export const useOrderStore = defineStore("orderStore", () => {
  const orders = ref<IOrder[]>([]);
  const isLoading = ref<boolean>(false);

  async function init(): Promise<void> {
    try {
      isLoading.value = true;
      const apiOrders = await orderApi.getOrders();
      // Simplified: just map API orders directly without complex transformations
      orders.value = apiOrders.map((o: any) => ({
        id: o.id,
        userId: o.userId,
        phone: o.phone,
        address: o.addressId ? { id: o.addressId, street: "", building: "", flat: "", comment: "" } : null,
        pizzas: o.orderPizzas?.map((p: any) => ({
          id: p.id?.toString() || "",
          name: p.name || "Пицца",
          count: p.quantity || 1,
          price: 0,
          fillings: [],
        })) || [],
        extras: o.orderMisc?.map((m: any) => ({
          id: m.miscId,
          name: m.name || "Доп. товар",
          count: m.quantity || 1,
          price: m.price || 0,
        })) || [],
        total: 0,
      }));
    } catch (e) {
      console.error("Failed to load orders:", e);
      orders.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  function addOrder(payload: IOrder): void {
    orders.value.push(payload);
  }

  async function deleteOrder(id: number): Promise<void> {
    await orderApi.deleteOrder(id);
    orders.value = orders.value.filter((o) => o.id !== id);
  }

  return { orders, addOrder, init, isLoading, deleteOrder };
});
