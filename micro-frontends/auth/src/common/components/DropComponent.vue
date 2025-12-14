<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { DRAG_TRANSFER_PAYLOAD_KEY } from "@/common/constants";

const emit = defineEmits(["drop"]);

function onDrop({ dataTransfer }: DragEvent) {
  if (!dataTransfer) return;
  const payload = dataTransfer.getData(DRAG_TRANSFER_PAYLOAD_KEY);
  if (payload) {
    const transferData = JSON.parse(
      dataTransfer.getData(DRAG_TRANSFER_PAYLOAD_KEY),
    );
    emit("drop", transferData);
  }
}
</script>
