<script setup lang="ts">
interface IProps {
  label: string;
  variant?: "default" | "danger";
}
defineProps<IProps>();

defineEmits(["click"]);
</script>

<template>
  <button
    :class="['multi-button b-none pointer', { danger: variant === 'danger' }]"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.multi-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: var(--secondary-color);
  transition: background-color 0.3s;
  background-color: var(--primary-color);
}

.multi-button.danger {
  background-color: var(--error-color);
}

.multi-button:hover {
  opacity: 0.9;
}
</style>
