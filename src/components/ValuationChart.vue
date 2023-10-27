<template>
  <div class="container">
    <Line v-if="chartData" :data="chartData" />
  </div>

  <p v-if="chartData">
    {{ chartData }}
  </p>
</template>

<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePropertyValuesStore } from '@/store/app'
const route = useRoute()
const account_id = ref(route.params.account_id)
const store_table = usePropertyValuesStore()
const { property_values, years, rmv_total } = storeToRefs(store_table)
// ---------above is in other component-------------
import { Line } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

//const name = 'LineChart'
const loaded = ref(false)
const chartData = shallowRef(null)

// onMounted() hook
onMounted(() => {
  try {
    store_table.fetchPropertyValues(account_id.value).then(() => {
      chartData.value = {
        type: 'line',
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: rmv_total.value
          }
        ]
      }
      loaded.value = true
      console.log(chartData.value)
    })
  } catch (error) {
    // Handle the error.
  }
})

</script>




