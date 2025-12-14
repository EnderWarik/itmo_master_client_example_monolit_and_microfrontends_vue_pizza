<template>
  <form action="#" method="post">
    <div class="wrapper">
      <TitleComponent size="big" tag="h1">Конструктор пиццы</TitleComponent>
      <div v-if="pizzaStore.isLoading">Загрузка...</div>
      <DoughSelector
        v-model="pizzaStore.selectedPizzaDoughId"
        :pizza-doughs="pizzaStore.pizzaDoughs"
      />
      <SizeSelector
        v-model="pizzaStore.selectedPizzaSizeId"
        :pizza-sizes="pizzaStore.pizzaSizes"
      />
      <IngredientsSelector
        v-model:sauce="pizzaStore.selectedPizzaSauceId"
        v-model:ingredients="pizzaStore.ingredients"
        :sauces="pizzaStore.sauces"
      />

      <ContentPizza
        v-model:pizza-name="pizzaStore.pizzaName"
        :fillings="pizzaStore.pizzaFillings"
        :selected-sauce-id="pizzaStore.selectedPizzaSauceId"
        :selected-size-id="pizzaStore.selectedPizzaDoughId"
        :total-price="pizzaStore.finalPrice"
        @drop="pizzaStore.updateFillings"
        @submit="onSubmit"
      ></ContentPizza>
    </div>
  </form>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import DoughSelector from "@/components/dough/DoughSelector.vue";
import SizeSelector from "@/components/size/SizeSelector.vue";
import IngredientsSelector from "@/components/ingredient/IngredientsSelector.vue";
import { usePizzaStore } from "@/stores/pizzaStore";
import ContentPizza from "@/components/content/ContentPizza.vue";

const pizzaStore = usePizzaStore();

function onSubmit() {
  pizzaStore.addToCart();
  window.dispatchEvent(new CustomEvent('pizza:go-to-cart'));
}
</script>

<style module lang="scss"></style>
