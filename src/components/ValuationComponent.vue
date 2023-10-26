<template>
  <v-fade-transition>
    <v-container class="justify-center">
      <v-col>
        <v-row class="d-flex align-center justify-center">
          <v-icon size="x-large" icon="mdi-chart-line" />
          <h1>Valuation for Account: {{ account_id }}</h1>
        </v-row>
        <v-row class="justify-center">
        <p v-for="items in get_table" :key="items.id">
          {{ items }}
        </p>
        </v-row>
      </v-col>
    </v-container>

  </v-fade-transition>
</template>

<script setup>
//import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs} from "pinia";
import { usePropertyTableStore } from "@/store/app";

const route = useRoute()
const account_id = ref(route.params.account_id)
const store_table = usePropertyTableStore()
const get_table = computed(() => {
  return store_table.getPropertyTable;
});

onMounted(() => {
  store_table.fetchPropertyTable(account_id.value);
})


// const data = usePropertyTableStore(account_id.value)
// const valuationData = ref(data)
// console.log(valuationData)

</script>


<style>
h1 {
  margin-left: 10px;
}
</style>
