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
            :hover=true>
          </v-data-table>
          <div class="d-flex flex-wrap">
          <div v-for="rows in property_values" :key="rows.id"></div>
          </div>


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

onMounted(() => {
  property_values.value = []
  store_table.fetchPropertyValues(account_id.value)
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
