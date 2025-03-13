<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { ref, onMounted, watch, computed, inject } from 'vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const isDarkMode = ref(false);
const colors = {
  dark: '#e9d812',
  light: '#e619c1'
};

const updateColor = () => {
  console.log("TEST")
  if(isDarkMode) {
    return colors.dark;
  } else {
    return colors.light;
  }
}

const chartData = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [
    {
      label: 'Visites',
      data: [10, 0, 15, 100, 200, 80, 200],
      borderColor: updateColor(),
      borderWidth: 2,
      pointBackgroundColor: '#FF7E67',
      tension: 0.4
    }
  ]
};

onMounted(() => {
  isDarkMode.value = localStorage.getItem("darkMode");
  chartData.datasets[0].borderColor = updateColor();
  
})
watch(isDarkMode, () => {
  chartData.datasets[0].borderColor = updateColor();
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top'
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => `${tooltipItem.raw} visites`
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        borderDash: [5, 5]
      }
    }
  }
};

</script>

<template>
  <div class="relative w-auto h-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>