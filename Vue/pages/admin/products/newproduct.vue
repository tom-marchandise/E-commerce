<script setup lang="ts">
import AjoutImage from "~/components/Admin/components/Product/NewProduct/AjoutImage.vue";
import Description from "~/components/Admin/components/Product/NewProduct/Descriptions.vue";
const links = [{
  label: 'Products',
  icon: 'i-heroicons-home',
  to: '/admin/products',
}]
</script>

<template>
  <UBreadcrumb :links="links" />
  <div class="flex justify-center items-center  py-10">
      <div class="flex w-full max-w-screen-2xl space-x-4">
        <div class="w-1/3">
          <AjoutImage/>
        </div>
        <div class="w-2/3">
          <Description/>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>