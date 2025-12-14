<template>
  <SheetComponent>
    <template #no-content>
      <ul v-if="items.length > 0" :class="[$style.list]">
        <CartListItem
          v-for="item in items"
          :key="item.id"
          v-model:count="item.count"
          :item="item"
          @edit="() => emit('edit', item.id)"
        />
      </ul>
      <div v-else :class="$style.empty">
        <p>В корзине нет ни одного товара</p>
      </div>
    </template>
  </SheetComponent>
</template>
<script setup lang="ts">
import CartListItem from "./CartListItem.vue";
import SheetComponent from "@pizza/shared/common/components/SheetComponent.vue";
import { IPizzaItem } from "@/types/pizza/IPizzaItem";

defineProps<{
  items: IPizzaItem[];
}>();

const emit = defineEmits<{
  edit: [id: string];
}>();
</script>
<style module lang="scss">
.list {
  margin: 0;
  padding: 15px 0;
  list-style: none;
}
.empty {
  padding: 20px 30px;
}
</style>
