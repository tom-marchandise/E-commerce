<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  to: string;
  icon: any;
  label: string;
  activeColorClass: string;
  inactiveColorClass: string;
}>();

const route = useRoute();

const isActive = computed(() => route.path === props.to);
</script>

<template>
  <li class="lg:px-4 xl:px-6">
    <NuxtLink
        :to="to"
        class="flex items-center justify-center p-4 lg:justify-start lg:gap-4 rounded-full group hover:bg-transparent-20 "
        :active-class="activeColorClass"
        :exact-active-class="activeColorClass"
    >
      <component
          :is="icon"
          :colorClass="isActive ? 'text-accent-500' : 'text-accent-300'"
          size="27"
          class="group-hover:text-accent-500"
      />
      <span :class="[isActive ? 'text-text-900' : 'text-text-700', 'font-semibold', 'group-hover:text-text-900']" class="hidden lg:block">
        {{ label }}
      </span>
    </NuxtLink>
  </li>
</template>



