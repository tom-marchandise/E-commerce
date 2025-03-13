<script setup lang="ts">
</script>

<template>
  <footer class="bg-[#171717] text-white py-5">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">

      <div class="flex flex-col space-y-2">
        <h2 class="text-2xl font-bold">Tech Yard</h2>
        <p class="opacity-70">You're welcome</p>
      </div>

      <div class="flex flex-col space-y-2 text-center md:text-left">
        <h3 class="text-lg font-semibold">À propos</h3>
        <a href="/faq" class="hover:underline opacity-70">FAQ</a>
        <a href="#" class="hover:underline opacity-70">Conditions générales</a>
      </div>

      <div class="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8">
        <div class="flex flex-col items-center md:items-end space-y-2">
          <h3 class="text-lg font-semibold text-center md:text-right mb-4">Suivez-nous !</h3>
          <div class="flex space-x-4">
            <a href="#" aria-label="Facebook" class="hover:text-blue-600">
              <svg class="h-6 w-6 text-white hover:text-gray-300 -mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 0H2C0.9 0 0 0.9 0 2V22c0 1.1 0.9 2 2 2h11v-9H8v-4h5V9c0-5 3-8 7-8 1.1 0 2 0.9 2 2v3h-3c-1.7 0-2 0.7-2 2v3h4l-1 4h-3v9h7c1.1 0 2-0.9 2-2V2c0-1.1-0.9-2-2-2z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" class="hover:text-blue-400">
              <svg class="h-6 w-6 text-white hover:text-gray-300 -mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3c-0.8 0.4-1.7 0.7-2.6 0.8 0.9-0.5 1.6-1.3 2-2.3-0.8 0.5-1.7 0.8-2.6 1-0.8-0.9-1.9-1.5-3.1-1.5-2.3 0-4.2 1.9-4.2 4.2 0 0.3 0 0.6 0.1 0.9-3.5-0.2-6.7-1.8-8.8-4.3-0.4 0.7-0.6 1.5-0.6 2.4 0 1.7 0.9 3.1 2.2 3.7-0.8 0-1.5-0.3-2.2-0.7 0 0 0 0.1 0 0.1 0 2.3 1.6 4.2 3.7 4.6-0.4 0.1-0.8 0.2-1.2 0.2-0.3 0-0.6 0-0.9-0.1 0.6 1.8 2.4 3.1 4.5 3.1-1.7 1.3-3.8 2.1-6.1 2.1-0.4 0-0.8 0-1.1-0.1 2.1 1.4 4.5 2.3 7.2 2.3 8.6 0 13.3-7.1 13.3-13.3 0-0.2 0-0.4 0-0.6 0.9-0.6 1.6-1.3 2.2-2.2z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" class="hover:text-pink-500">
              <svg class="h-6 w-6 text-white hover:text-gray-300 -mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.3 0 3.7 0 5 0.1 1.2 0.1 2.2 0.6 3 1.4 0.8 0.8 1.3 1.8 1.4 3 0.1 1.3 0.1 1.7 0.1 5s0 3.7-0.1 5c-0.1 1.2-0.6 2.2-1.4 3-0.8 0.8-1.8 1.3-3 1.4-1.3 0.1-1.7 0.1-5 0.1s-3.7 0-5-0.1c-1.2-0.1-2.2-0.6-3-1.4-0.8-0.8-1.3-1.8-1.4-3-0.1-1.3-0.1-1.7-0.1-5s0-3.7 0.1-5c0.1-1.2 0.6-2.2 1.4-3 0.8-0.8 1.8-1.3 3-1.4 1.3-0.1 1.7-0.1 5-0.1zM12 0c-3.5 0-3.9 0-5.3 0.1-1.8 0.1-3.4 0.8-4.7 2.1-1.3 1.3-2 2.9-2.1 4.7-0.1 1.4-0.1 1.8-0.1 5.3s0 3.9 0.1 5.3c0.1 1.8 0.8 3.4 2.1 4.7 1.3 1.3 2.9 2 4.7 2.1 1.4 0.1 1.8 0.1 5.3 0.1s3.9 0 5.3-0.1c1.8-0.1 3.4-0.8 4.7-2.1 1.3-1.3 2-2.9 2.1-4.7 0.1-1.4 0.1-1.8 0.1-5.3s0-3.9-0.1-5.3c-0.1-1.8-0.8-3.4-2.1-4.7-1.3-1.3-2.9-2-4.7-2.1-1.4-0.1-1.8-0.1-5.3-0.1zM12 5.8c-3.3 0-6 2.7-6 6 0 3.3 2.7 6 6 6 3.3 0 6-2.7 6-6 0-3.3-2.7-6-6-6zM12 16.8c-2.7 0-4.8-2.2-4.8-4.8s2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8-2.2 4.8-4.8 4.8zM17 6.4c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5z"></path>
              </svg>
            </a>
          </div>
        </div>
        <a href="#" class="bg-white text-black px-4 py-2 rounded-3xl hover:bg-[#e9e9e9ff]">Contactez-nous</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
