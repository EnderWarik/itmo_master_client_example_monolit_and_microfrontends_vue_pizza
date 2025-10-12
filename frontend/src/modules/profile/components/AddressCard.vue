<template>
  <div :class="$style.wrapper">
    <SheetComponent :class="$style.card">
      <div :class="$style.header">
        <b>{{ title }}</b>
        <button type="button" :class="$style.icon" @click="$emit('edit')">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>

      <p :class="$style.address">{{ address }}</p>
      <small v-if="note" :class="$style.note">{{ note }}</small>
    </SheetComponent>
  </div>
</template>
<script setup lang="ts">
import SheetComponent from "@/common/components/SheetComponent.vue";

defineProps<{
  title: string;
  address: string;
  note?: string;
}>();

defineEmits<{ edit: [] }>();
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-colors";

.wrapper {
  margin-top: 16px;
}
.card {
  position: relative;
  padding-top: 0;
  padding-bottom: 26px;
}

.header {
  @include ds-typography.b-s14-h16;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);
}
.address {
  @include ds-typography.r-s16-h19;
  margin: 0 0 16px;
  padding: 0 16px;
}
.note {
  @include ds-typography.l-s11-h13;
  display: block;
  padding: 0 16px;
}

.icon {
  cursor: pointer;
  display: block;
  overflow: hidden;
  width: 32px;
  height: 32px;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  background-color: ds-colors.$white;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.card :global(div[class*="content"]) {
  display: block;
  padding: 0;
  border-top: none;
}
</style>
