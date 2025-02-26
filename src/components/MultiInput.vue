<script setup lang="ts">
import { ref, computed } from "vue";

interface IProps {
  modelValue: string | null | undefined;
  title: string;
  placeholder: string;
  maxLength: number;
  error?: string;
  type?: string;
}
const props = defineProps<IProps>();

const emit = defineEmits(["update:modelValue", "blur"]);

const isPasswordVisible = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return isPasswordVisible.value ? "text" : "password";
  }
  return props.type || "text";
});

const eyeIcon = computed(() => (isPasswordVisible.value ? "👁️" : "👁️‍🗨️"));

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emit("update:modelValue", target.value);
  }
};
</script>

<template>
  <div class="multi-input flex flex-column mb-1">
    <span>{{ title }}</span>
    <div class="input-container relative flex items-center w-full">
      <input
        :value="modelValue"
        :class="{ error: error }"
        :type="inputType"
        :placeholder="placeholder"
        :maxlength="maxLength"
        @input="handleInput"
        @blur="$emit('blur')"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password absolute flex items-center justify-center b-none pointer"
        :title="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
        @click="togglePasswordVisibility"
      >
        {{ eyeIcon }}
      </button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.multi-input {
  gap: 6px;
}

input.error {
  border-color: var(--error-color);
}

.toggle-password {
  right: 10px;
  background: none;
  font-size: 16px;
  padding: 0;
  height: 24px;
  width: 24px;
}

.toggle-password:focus {
  outline: none;
}
</style>
