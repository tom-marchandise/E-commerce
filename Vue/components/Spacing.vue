<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';
import clsx from 'clsx';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  }
});

const computedClass = computed(() => {
  return clsx({
    'h-8 lg:h-16': props.size === 'sm',
    'h-16 lg:h-24': props.size === 'md',
    'h-24 lg:h-32': props.size === 'lg'
  });
});
</script>
<template>
  <div :class="computedClass"></div>
</template>

<style scoped>
</style>
