<template>
  <v-fade-transition>
    <v-container class="justify-center">
      <v-col>
        <v-row class="d-flex align-center justify-center">
          <v-icon size="x-large" icon="mdi-chart-line" />
          <h1>Valuation for Account: {{ account_id }}</h1>
        </v-row>
        <v-row class="justify-center">

          <v-data-table
            v-if="property_values.length > 0"
            v-model:items-per-page="itemsPerPage"
            :items="property_values"
            :headers="headers"
            :sort-by="[{ key: 'year', order: 'asc' }]"
            class="elevation-10"
            :hover=true
          >
          </v-data-table>

          <div class="d-flex flex-wrap">
          <div v-for="rows in property_values" :key="rows.id"></div>
          </div>

<!--          <div>-->
<!--            <canvas id="myChart"></canvas>-->
<!--          </div>-->
        </v-row>


      </v-col>

    </v-container>

  </v-fade-transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePropertyValuesStore } from '@/store/app'

// import Chart from 'chart.js/auto'
// const data = ref( {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [{
//     label: '# of Votes',
//     data: [12, 19, 3, 5, 2, 3],
//     borderWidth: 1
//   }]
// })
//
// const config = ref( {
//   type: 'line',
//   data: data,
//   options: {}
// })
//
// const chart = ref([])

const route = useRoute()
const account_id = ref(route.params.account_id)
const store_table = usePropertyValuesStore()
const { property_values, years, rmv_total } = storeToRefs(store_table)
const itemsPerPage  = ref(11)
const headers = ref([
  { title: 'Year', key: 'year', align: 'end' },
  { title: 'Real Market Value - Land', key: 'rmv_land', align: 'end' },
  { title: 'Real Market Value - Structure', key: 'rmv_impr', align: 'end' },
  { title: 'Total Real Market Value', key: 'rmv_total', align: 'end' },
  { title: 'Total Assessed Value', key: 'total_av', align: 'end' },
  { title: 'Maximum Assessed Value', key: 'max_av', align: 'end' },
  { title: 'Exemptions', key: 'exempt', align: 'end' },
])


// const lineChartData = ref({
//   labels: years,
//   datasets: [
//     {
//       label: 'RMV Total',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 2,
//       data: rmv_total,
//     },
//   ],
// });

onMounted(() => {
  store_table.fetchPropertyValues(account_id.value)
  // chart.value=(new Chart(
  //   document.getElementById('myChart'),
  //   config
  // ))
  // lineChartData.value.labels.push(property_values.value.map(item => item.year));
  // lineChartData.value.datasets[0].data.push(property_values.value.map(item => item.rmv_total));
  // console.log(property_values.value.map((item) => item.year))
})
</script>

<style>
h1 {
  margin-left: 10px;
}
.v-data-table {
  margin: 20px;
}
</style>
