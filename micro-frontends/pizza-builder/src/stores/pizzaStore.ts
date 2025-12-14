import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IPizzaSauce } from "@/types/IPizzaSauce";
import { IPizzaSize } from "@/types/IPizzaSize";
import { IPizzaDough } from "@/types/IPizzaDough";
import { IPizzaItem } from "@/types/IPizzaItem";
import { mapWithCount } from "@/helpers/mappers";
import { IPizzaIngredient } from "@/types/IPizzaIngredient";
import { pizzaApi } from "@/api/pizzaApi";

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const usePizzaStore = defineStore("pizzaStore", () => {
  const isLoading = ref<boolean>(false);

  const ingredients = ref<(IPizzaIngredient & { count: number })[]>([]);
  const sauces = ref<IPizzaSauce[]>([]);
  const pizzaSizes = ref<IPizzaSize[]>([]);
  const pizzaDoughs = ref<IPizzaDough[]>([]);

  const selectedPizzaDoughId = ref<number>(0);
  const selectedPizzaSizeId = ref<number>(0);
  const selectedPizzaSauceId = ref<number>(0);

  const pizzaName = ref<string>("");
  const editingItemId = ref<string | null>(null);

  async function init(): Promise<void> {
    try {
      isLoading.value = true;
      const [doughs, ingredientsResp, saucesResp, sizesResp] =
        await Promise.all([
          pizzaApi.getDoughs(),
          pizzaApi.getIngredients(),
          pizzaApi.getSauces(),
          pizzaApi.getSizes(),
        ]);

      pizzaDoughs.value = doughs;
      ingredients.value = mapWithCount(ingredientsResp);
      sauces.value = saucesResp;
      pizzaSizes.value = sizesResp;

      selectedPizzaDoughId.value = doughs[0]?.id ?? 0;
      selectedPizzaSizeId.value = sizesResp[0]?.id ?? 0;
      selectedPizzaSauceId.value = saucesResp[0]?.id ?? 0;
    } finally {
      isLoading.value = false;
    }
  }

  const currentDough = computed<IPizzaDough | undefined>(() => {
    return pizzaDoughs.value.find(
      (item) => item.id === selectedPizzaDoughId.value
    ) || pizzaDoughs.value[0];
  });

  const doughPrice = computed(() => currentDough.value?.price || 0);

  const currentSize = computed<IPizzaSize | undefined>(() => {
    return pizzaSizes.value.find(
      (item) => item.id === selectedPizzaSizeId.value
    ) || pizzaSizes.value[0];
  });

  const sizePrice = computed(() => currentSize.value?.multiplier || 0);

  const currentSauce = computed<IPizzaSauce | undefined>(() => {
    return sauces.value.find(
      (item) => item.id === selectedPizzaSauceId.value
    ) || sauces.value[0];
  });

  const saucePrice = computed(() => currentSauce.value?.price || 0);

  const ingredientsPrice = computed(() => {
    let result = 0;
    for (const ingredient of ingredients.value) {
      if (ingredient.count <= 0) continue;
      result += ingredient.price * ingredient.count;
    }
    return result;
  });

  const finalPrice = computed(() => {
    return (doughPrice.value + saucePrice.value + ingredientsPrice.value) * sizePrice.value;
  });

  const pizzaFillings = computed(() => {
    return ingredients.value.filter((item) => item.count > 0) || [];
  });

  function updateFillings(ingredient: IPizzaIngredient) {
    const currentIngredient = ingredients.value.find(
      (item) => item.id === ingredient.id
    );
    if (!currentIngredient) return;
    currentIngredient.count = currentIngredient.count + 1;
  }

  function addToCart(): void {
    const nameTrimmed = pizzaName.value.trim();
    if (!nameTrimmed) {
      alert("Введите название пиццы");
      return;
    }
    const pizza: IPizzaItem = {
      id: editingItemId.value ?? generateId(),
      name: nameTrimmed,
      size: currentSize.value!,
      dough: currentDough.value!,
      sauce: currentSauce.value!,
      fillings: pizzaFillings.value,
      count: 1,
      price: finalPrice.value,
    };

    window.dispatchEvent(new CustomEvent('pizza:add-to-cart', { detail: pizza }));
    resetCurrentPizza();
  }

  function resetCurrentPizza(): void {
    pizzaName.value = "";
    selectedPizzaDoughId.value = pizzaDoughs.value[0]?.id ?? 0;
    selectedPizzaSizeId.value = pizzaSizes.value[0]?.id ?? 0;
    selectedPizzaSauceId.value = sauces.value[0]?.id ?? 0;
    ingredients.value = ingredients.value.map((ing) => ({ ...ing, count: 0 }));
  }

  return {
    isLoading,
    ingredients,
    sauces,
    pizzaSizes,
    pizzaDoughs,
    pizzaName,
    selectedPizzaDoughId,
    selectedPizzaSizeId,
    selectedPizzaSauceId,
    finalPrice,
    pizzaFillings,
    updateFillings,
    addToCart,
    resetCurrentPizza,
    init,
  };
});
