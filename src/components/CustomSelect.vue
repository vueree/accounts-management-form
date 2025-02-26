<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import type { IOption } from "../types/";

interface IProps {
  modelValue: string;
  title: string;
  options: IOption[];
}
const props = defineProps<IProps>();

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(
    (option) => option.value === props.modelValue
  );
  return selectedOption ? selectedOption.label : "Выберите опцию";
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: IOption) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    selectRef.value &&
    !selectRef.value.contains(event.target as Node) &&
    isOpen.value
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    ref="selectRef"
    :class="[
      { open: isOpen },
      'custom-select relative w-full flex flex-column mb-1',
    ]"
  >
    <span>{{ title }}</span>
    <div
      class="selected-option flex items-center pointer"
      @click="toggleDropdown"
    >
      {{ selectedLabel }}
      <span :class="[{ rotated: isOpen }, 'arrow']">▼</span>
    </div>

    <ul v-if="isOpen" class="options-list absolute overflow-y-auto">
      <li
        v-for="option in options"
        :key="option.value"
        :class="[{ selected: option.value === modelValue }, 'pointer']"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-select {
  gap: 6px;
}

.selected-option {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--secondary-color);
  border: 1px solid var(--accent-color);
  justify-content: space-between;
}

.selected-option .arrow {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
  display: inline-block;
  color: var(--primary-color);
}

.selected-option .arrow.rotated {
  transform: rotate(180deg);
}

.options-list {
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  background-color: var(--secondary-color);
  z-index: 1000;
  max-height: 200px;
}

.options-list li {
  padding: 0.5rem;
}

.options-list li:hover {
  background-color: #dcdcff;
}

.options-list li.selected {
  background-color: #8181f6;
  color: var(--secondary-color);
}

.custom-select.open .selected-option {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.custom-select.open .options-list {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
