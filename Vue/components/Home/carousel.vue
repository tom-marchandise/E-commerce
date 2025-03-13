<template>
  <div class="relative w-full h-1/3 flex flex-col justify-center items-center">
    <div class="relative z-20 bg-background-50 rounded-3xl shadow-lg p-6 w-11/12 max-w-4xl bg-transparent-10">
      <h2 class="text-xl font-bold text-center pb-4">MARQUES POPULAIRES</h2>
      <div class="flex justify-around items-center">
        <img src="assets/homePage/banner/hyperx-logo.png" alt="logo de la marque HyperX" class="h-12 lg:h-16">
        <img src="assets/homePage/banner/logitech.png" alt="logo de la marque Logitech" class="h-12 lg:h-16">
        <img src="assets/homePage/banner/razer.png" alt="logo de la marque Razer" class="h-12 lg:h-16">
        <img src="assets/homePage/banner/roccat.png" alt="logo de la marque Roccat" class="h-12 lg:h-16">
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background-color: rgba(0, 0, 0, 0.55);
  pointer-events: none;
}
</style>
<script setup lang="ts">
</script>