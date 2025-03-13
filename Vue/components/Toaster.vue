<template>
  <div v-if="visible" class="toaster" :class="type">
    <!-- Icône d'éclair à gauche -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-zap"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="margin-right: 8px;"
    >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M13 2 3 14h8v8l10-12h-8z" />
    </svg>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success'
  },
  duration: {
    type: Number,
    default: 4000
  }
});

const visible = ref(false);

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
});
</script>

<style scoped>
.toaster {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #111721;
  color: white;
  padding: 15px;
  border-radius: 5px;
  transition: opacity 0.5s;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.toaster.error {
  background-color: #f44336;
}
</style>
