<template>

  <v-container class="justify-center">
    <v-col>
    <v-row class="d-flex align-center justify-center">
    <v-icon size="x-large" icon="mdi-database-outline" />
    <h1>Summary for Account: {{ account_id }}</h1>
    </v-row>
<!--  </v-container>-->

<!--  <v-container>-->
  <v-row class="justify-center">

  <v-card
    class="summaryPage"
    width="450"
    title="Account Information"
    elevation="10"

  >
    <v-divider></v-divider>
  <v-list>
    <v-list-item><strong>Mailing Name:</strong> {{summaryData.owner_name}}</v-list-item>
    <v-list-item><strong>Map and Tax Lot: </strong>{{summaryData.map_taxlot}}</v-list-item>
    <v-list-item><strong>Situs Address:</strong> {{summaryData.situs_address}}</v-list-item>
    <v-list-item><strong>Tax Status: </strong>{{summaryData.tax_status}}</v-list-item>
  </v-list>
  </v-card>

  <v-card
    scroll=false
    class="summaryPage"
    width="450"
    title="Ownership"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <p>
          <strong>Mailing To:</strong>
          <br />{{summaryData.owner_name}}
          <br />{{summaryData.owner_mailing_address1}}
          <br />{{summaryData.owner_mailing_city}}, {{summaryData.owner_mailing_state}} {{summaryData.owner_mailing_zip}}
        </p>
      </v-list-item>
    </v-list>
      <v-row class="d-flex align-center justify-center">
        <v-card-actions>
          <v-btn
            block rounded="lg"
            density="comfortable"
            :href="'https://co.crook.or.us/assessor/webform/mailing-address-change-request-form'">
            Change of Mailing Address Form
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-btn
            block rounded="lg"
            density="comfortable"
            :href="'https://geo.co.crook.or.us/portal/apps/webappviewer/index.html?id=370f5ec185b945db9d92999cef827982&query=Taxlots,Maptaxlot,{{summaryData.map_taxlot}}'">
            View Overview Map
          </v-btn>
        </v-card-actions>
      </v-row>

  </v-card>

  <v-card
    class="summaryPage"
    width="450"
    title="Taxes"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item><strong>Property Tax (Current Year): </strong>{{summaryData.current_property_tax}}</v-list-item>
<!--      <v-list-item>Get Current Balance Due (PDF)</v-list-item>-->
<!--      <v-list-item>Tax Payments & History</v-list-item>-->
      <v-list-item><strong>Tax Code Area:</strong> 00{{summaryData.tax_code_area}}</v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn
        block rounded="lg"
        density="comfortable"
        :href="'https://co.crook.or.us/tax-collection'">
        Pay Your Property Taxes
      </v-btn>
    </v-card-actions>

  </v-card>

  <v-card
    class="summaryPage"
    width="450"
    title="Assessment"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>  <strong>Assessor Property Description:</strong> information pop-up here</v-list-item>
      <v-list-item>{{summaryData.subdivision}}</v-list-item>
      <v-list-item><strong>Assessor Acres:</strong> {{summaryData.land_size_acres}}</v-list-item>
      <v-list-item><strong>Property Class:</strong> {{summaryData.property_class}} </v-list-item>
    </v-list>
  </v-card>

  <v-card
    class="summaryPage"
    width="450"
    title="Zoning"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>Zone: </v-list-item>
      <v-list-item>Zone Description: </v-list-item>
      <v-list-item :href="'https://www.codepublishing.com/OR/CrookCounty/#!/CrookCounty18/CrookCounty1840.html#18.40'">Zone Link</v-list-item>
    </v-list>
  </v-card>

  <v-card
    class="summaryPage"
    width="450"
    title="Valuation"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Category
        </th>
        <th class="text-left">
          Value
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Land</td>
        <td>${{summaryData.rmv_land}}</td>
      </tr>
      <tr>
        <td>Structures</td>
        <td>${{summaryData.rmv_improvements}}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>${{summaryData.rmv_total}}</td>
      </tr>
      </tbody>
    </v-table>

    <v-card-actions>
      <v-btn
        block rounded="lg"
        density="comfortable"
        :href="'http://apps.lanecounty.org/PropertyAssessmentTaxationSearch/crook/Real/Valuation/' + account_id">
        Current Year Value Summary
      </v-btn>
    </v-card-actions>

  </v-card>
    </v-row>
    </v-col>
  </v-container>


</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { component as VueNumber } from '@coders-tm/vue-number-format'

const route = useRoute()
const account_id = ref(route.params.account_id)
const summaryData = ref([])

onMounted(() => {
  loadSummaryData(account_id.value)
})

async function loadSummaryData(value) {

  const propertyTableUrl = `https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/11/query?where=account_id+%3D+%27${value}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`;
  const zoneTableUrl = ''

  axios.get(propertyTableUrl)
    .then((response) => {
      const propertyTableUrlResponse = response.data.features
      for (const items of propertyTableUrlResponse) {
        summaryData.value = items.attributes
        console.log(summaryData.value)
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
</script>

<style>
.summaryPage {
  margin: 10px;
}
.v-card-actions .v-btn {
  background-color: #2196f3;
  width: 384px;
}
h1 {
  margin-left: 10px;
}
</style>
