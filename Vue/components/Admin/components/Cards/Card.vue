<script setup lang="ts">
</script>

<template>
  
  <div class=" ">
      <div v-if="$slots.header" class="">
        <slot name="header" />
      </div>

      <div class="overflow-y-auto  scrollbar-hide mb-5">
        <slot name="content" />
      </div>

      <div v-if="$slots.footer" class="">
        <slot name="footer" />
      </div>
  </div>
    
</template>
