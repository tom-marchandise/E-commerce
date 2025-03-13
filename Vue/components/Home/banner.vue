<script setup lang="ts">
import carouselImage from '@/assets/homePage/carousel/carousel.jpg';
import carouselImage2 from '@/assets/homePage/carousel/carousel_img_2.webp';
import carouselImage3 from '@/assets/homePage/carousel/carousel_img_3.webp';
import carouselImage4 from '@/assets/homePage/carousel/carousel_img_4.webp';
import carouselImage5 from '@/assets/homePage/carousel/carousel_img_5.webp';



const items = [
  carouselImage,
  carouselImage2,
  carouselImage3,
  carouselImage4,
  carouselImage5,
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 10000)
})

</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-4/5 flex justify-center p-2">
      <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="items"
          :ui="{ item: 'basis-full' }"
          class="rounded-3xl overflow-hidden flex items-center h-96 shadow-lg"
          indicators
      >
        <img :src="item" class="w-full h-full object-contain" draggable="false">
      </UCarousel>
    </div>
  </div>
</template>


<style scoped>
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
