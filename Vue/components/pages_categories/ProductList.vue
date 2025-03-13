  <script setup lang="ts">
const props = defineProps({
  products: Array,
  filters: Object,
  cat: String
})
const searchbarValue = ref('')
const handleSearchInput = () => {
  return props.products.filter((product) => product.name.toLowerCase().includes(searchbarValue.value.toLowerCase()))
}
const order = ref([
  { value: 'letter-ascend', label: 'Alphabétique A-Z' },
  { value: 'letter-descend', label: 'Alphabétique Z-A' },
  { value: 'newest', label: 'Nouveauté' },
  { value: 'price-ascend', label: 'Prix ascendant' },
  { value: 'price-descend', label: 'prix descendant' },

]);
const getDateDiff = (date) => {
  const productDate = new Date(date)
  const currentDate = new Date(Date.now())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()+1
  return Math.abs(currentDate.getDate() - productDate.getDate())
}

const getDiscount = (formerPrice: number, newPrice: number) => {
  return Math.ceil(newPrice/formerPrice*100)
}

const redirection = (productId: Number) => {
  navigateTo(`/categories/${props.cat}/${productId}`)
}
</script>

<template>
  <div class="xl:grid xl:grid-cols-4 xl:min-h-screen bg-[#F3F2F2] dark:bg-black xl:pb-20 xl:pt-6">
    <div class="xl:col-span-1 xl:mx-auto">
      <div class="xl:ml-20">
      </div>
      <div class="sm:block hidden bg-transparent-10 border border-dominant-500 xl:rounded-lg xl:w-5/6 xl:h-fit xl:ml-20 shadow xl:pb-3">
        <div class="py-5 mx-7 border-b border-b-[#D2D2D2]">
          <UInput icon="i-heroicons-magnifying-glass-20-solid"
                  size="sm"
                  color="white"
                  variant="outline"
                  trailing
                  placeholder="Chercher un nom..."
                  class="w-60 m-auto"
                  v-model="searchbarValue"
          />
        </div>
        <div class="p-3 flex flex-col gap-3">
        <div v-for="(filterValue, filterName) in JSON.parse(filters)" class="flex gap-3 justify-center">
          <USelect :options="filterValue" :placeholder="filterName" class="w-5/6"/>
        </div>
          </div>
      </div>
    </div>
    <div class="flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
      <button>Filtre</button>
    </div>
    <div class="xl:col-span-3">
      <div class="bg-transparent-10 border border-dominant-500 shadow xl:rounded-lg xl:p-6 xl:w-5/6 xl:m-auto">
        <div class="xl:grid xl:grid-cols-4 border-b-[#D2D2D2] border-b pb-5">
          <h1 class="text-dominant-500 font-bold xl:text-2xl xl:col-span-3 text-xl">{{cat}}</h1>
          <div class="xl:col-span-1 xl:flex flex ml-5">
            <span class="flex items-center">Trier par :</span>
            <USelect placeholder="Marque" :options="order" model-value="" class="xl:ml-2 ml-5 w-fit"/>
          </div>
        </div>
        <div v-for="product in handleSearchInput()" :key="product.id" @click="redirection(product.id)" class="hover:bg-gray-300 dark:hover:bg-gray-800 bg-transparent-10 cursor-pointer xl:flex xl:p-5 xl:rounded-xl xl:mt-7 mt-5 p-5">
          <div class="flex xl:w-9/12 xl:border-r xl:border-r-[#D2D2D2]">
            <img :src="JSON.parse(product.image)[0]" :alt="product.name" class="xl:w-28 xl:mr-5 xl:rounded-lg w-28 xl:h-fit m-auto rounded-lg">
            <div class="xl:mt-3 mx-3">
              <h2 class="font-bold xl:text-lg">{{ product.name }}</h2>
              <span class="items-center flex text-emerald-400 w-fit rounded-lg font-bold mt-2" v-if="getDateDiff(product.created_at) < 14">NOUVEAUTÉ !</span>
              <p class="text-gray-900 xl:text-md text-sm" v-if="product.main_specs">{{product.main_specs}}</p>
              <p class="xl:mt-2 xl:text-md text-sm" v-if="product.description">{{ product.description }}</p>
            </div>
          </div>
          <div class="xl:w-3/12 flex-col flex xl:pt-4 m-auto">
            <div class="flex flex-col items-center">
              <div>
                <span class="font-bold justify-center text-xl" :id="product.promotions.length !== 0 && 'strikethrough'">{{ product.price }} €</span>
                <span v-if="product.promotions.length !== 0" class="font-bold text-xl ml-1">{{ product.promotions[product.promotions.length - 1].new_price }} €</span>
              </div>
              <span v-if="product.promotions.length !== 0" class="text-red-600 font-bold text-lg">-{{getDiscount(product.price, product.promotions[product.promotions.length - 1].new_price)}}%</span>
              <span class="xl:pt-2 font-medium" :class="product.stocks > 10 ? 'text-green-500' : product.stocks === 0 ? 'text-red-500' : `text-amber-500`">{{ product.stocks > 10 ? 'En stock' : product.stocks === 0 ? 'Hors stock' : `Plus que ${product.stocks}`}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>