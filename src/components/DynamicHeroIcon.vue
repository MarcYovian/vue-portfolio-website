<template>
  <component v-if="iconComponent" :is="iconComponent" class="icon" />
</template>

<script setup>
import { computed } from "vue";
import { resolveIcon } from "../utils/heroicon.js";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const iconComponent = computed(() => resolveIcon(props.name));
</script>

<style scoped>
.icon {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
