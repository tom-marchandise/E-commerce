<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{ category: number }>();

const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

const colors = {
  dark: ['#e9d812', '#ff6666', '#36454f'], // Couleurs pour le mode sombre
  light: ['#e619c1', '#00cccc', '#dcdcdc'] // Couleurs pour le mode clair
};

const generateBackgroundColors = () => {
  return isDarkMode.value ? colors.dark : colors.light;
};

const chartData = computed(() => ({
  labels: ['Périphériques', 'Composants', 'Ordinateur'],
  datasets: [
    {
      backgroundColor: generateBackgroundColors(),
      data: [40, 30, 25],
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 1000,
      spacing: 10,
      zindex : 10
    }
  ]
}));

const options = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '84%',
  plugins: {
    legend: {
      position: 'hidden',
    },
  },
};

watch(isDarkMode, (newDarkMode) => {
  console.log(newDarkMode)
  chartData.value.datasets[0].backgroundColor = generateBackgroundColors();
});

onMounted(() => {
  chartData.value.datasets[0].backgroundColor = generateBackgroundColors();
});
</script>

<template>
  <div class="w-[10.8rem] h-[10.75rem] relative ">
    <Doughnut :data="chartData" :options="options" class="w-full h-full z-10" />
    <span class="font-bold text-5xl text-dominant-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">{{ props.category }}</span>
  </div>
</template>

