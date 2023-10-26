<template>
  <v-fade-transition>
    <v-container class="justify-center">
      <v-col>
        <v-row class="d-flex align-center justify-center">
          <v-icon size="x-large" icon="mdi-chart-line" />
          <h1>Valuation for Account: {{ account_id }}</h1>
        </v-row>
        <v-row class="justify-center">

          <v-data-table :items="property_values"
                        :headers="headers"
          ></v-data-table>

          <div class="d-flex flex-wrap">
          <div v-for="rows in property_values" :key="rows.id"></div>
          </div>


          <p v-for="values in property_values"
             :key="values.id">{{ values }}</p>

<!--          <v-table>-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th class="text-left">-->
<!--                Valuations-->
<!--              </th>-->
<!--              <th class="text-left">-->
<!--                Calories-->
<!--              </th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--            <tr-->
<!--              v-for="values in property_values"-->
<!--              :key="values.id"-->
<!--            >-->
<!--              <td>{{ item.year }}</td>-->
<!--              <td>{{ item.rmv_land }}</td>-->
<!--            </tr>-->
<!--            </tbody>-->
<!--          </v-table>-->


<!--          <v-table>-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th class="text-left">-->
<!--                Real Market Value - Land-->
<!--              </th>-->
<!--              <th class="text-left">-->
<!--                Real Market Value - Structure-->
<!--              </th>-->
<!--              <th class="text-left">-->
<!--                Total Real Market Value-->
<!--              </th>-->
<!--              <th class="text-left">-->
<!--                Total Assessed Value-->
<!--              </th>-->
<!--              <th class="text-left">-->
<!--                Maximum Assessed Value-->
<!--              </th>-->
<!--              <th class="text-left">-->
<!--                Exemptions-->
<!--              </th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--            <tr>-->
<!--              <td>Land</td>-->
<!--              <td>${{property.rmv_land}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>Structures</td>-->
<!--              <td>${{property.rmv_improvements}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>Total</td>-->
<!--              <td>${{property.rmv_total}}</td>-->
<!--            </tr>-->
<!--            </tbody>-->
<!--          </v-table>-->

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

const route = useRoute()
const account_id = ref(route.params.account_id)
const store_table = usePropertyValuesStore()
const { property_values } = storeToRefs(store_table)
// const itemsPerPage  = ref(10)
const headers = ref([
  // {
  //   title: 'Property Valuation',
  //   align: 'start',
  //   sortable: true,
  //   key: 'id',
  // },
  { title: 'Year', key: 'year', align: 'end' },
  { title: 'Real Market Value - Land', key: 'rmv_land', align: 'end' },
  { title: 'Real Market Value - Structure', key: 'rmv_impr', align: 'end' },
  { title: 'Total Real Market Value', key: 'rmv_total', align: 'end' },
  { title: 'Total Assessed Value', key: 'total_av', align: 'end' },
  { title: 'Maximum Assessed Value', key: 'max_av', align: 'end' },
  { title: 'Exemptions', key: 'exempt', align: 'end' },
])
onMounted(() => {
  store_table.fetchPropertyValues(account_id.value)
})

</script>

<style>
h1 {
  margin-left: 10px;
}
</style>
