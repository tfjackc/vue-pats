<template>
  <v-fade-transition>
    <v-container class="justify-center">
      <v-col>
        <v-row class="d-flex align-center justify-center">
          <v-icon size="x-large" icon="mdi-chart-line" />
          <h1>Valuation for Account: {{ account_id }}</h1>
        </v-row>
        <v-row class="justify-center">
<!--        <p v-for="i in summaryData" :key="summaryData.id">-->
<!--          {{ i }}-->
<!--        </p>-->
          <p v-if="valuationData.length > 0">{{ valuationData.value.property_table }}</p>
        </v-row>
      </v-col>
    </v-container>

  </v-fade-transition>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadSummaryData } from "@/assets/propertyTable";

const route = useRoute()
const account_id = ref(route.params.account_id)
const data = loadSummaryData(account_id.value)
const valuationData = ref(data)
console.log(valuationData)

</script>


<style>
h1 {
  margin-left: 10px;
}
</style>
