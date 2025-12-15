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
      // Map API orders - note: prices would need catalog lookup for accurate calculation
      orders.value = apiOrders.map((o: any) => {
        const pizzas = (o.orderPizzas || []).map((p: any) => ({
          id: p.id?.toString() || "",
          name: p.name || "Пицца",
          count: p.quantity || 1,
          price: 500, // Placeholder - real price requires size/dough/sauce/ingredient lookups
          fillings: (p.ingredients || []).map((i: any) => ({
            id: i.ingredientId,
            name: "",
            count: i.quantity || 1,
          })),
        }));

        const extras = (o.orderMisc || []).map((m: any) => ({
          id: m.miscId,
          name: "Доп. товар",
          count: m.quantity || 1,
          price: 100, // Placeholder price
        }));

        // Calculate rough total
        const pizzaTotal = pizzas.reduce((sum: number, p: any) => sum + p.price * p.count, 0);
        const extrasTotal = extras.reduce((sum: number, e: any) => sum + e.price * e.count, 0);

        return {
          id: o.id,
          userId: o.userId,
          phone: o.phone,
          address: o.orderAddress ? {
            id: o.orderAddress.id,
            street: o.orderAddress.street || "",
            building: o.orderAddress.building || "",
            flat: o.orderAddress.flat || "",
            comment: o.orderAddress.comment || "",
          } : null,
          deliveryType: "delivery" as const,
          pizzas,
          extras,
          total: pizzaTotal + extrasTotal,
        };
      });
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
