<template>

  <v-container>
    <v-row class="d-flex align-center justify-center">
<!--    <v-icon icon="mdi-database-outline" />-->
    <h1>Summary for Account: {{ account_id }}</h1>
    </v-row>
  </v-container>

  <v-container>
    <v-row>

  <v-card
    class="summaryPage"
    width="400"
    title="Account Information"
    elevation="10"
  >
    <v-divider></v-divider>
  <v-list>
    <v-list-item>Mailing Name: </v-list-item>
    <v-list-item>Map and Tax Lot: </v-list-item>
    <v-list-item>Situs Address: </v-list-item>
    <v-list-item>Tax Status: </v-list-item>
  </v-list>
  </v-card>

  <v-card
    class="summaryPage"
    width="400"
    title="Ownership"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>Mailing To: </v-list-item>
      <v-list-item :href="'https://co.crook.or.us/assessor/webform/mailing-address-change-request-form'">Change of Mailing Address Form</v-list-item>
      <v-list-item :href="'https://geo.co.crook.or.us/portal/apps/webappviewer/index.html?id=370f5ec185b945db9d92999cef827982&query=Taxlots,Maptaxlot,151629B002600'">View Overview Map</v-list-item>
    </v-list>
  </v-card>

  <v-card
    class="summaryPage"
    width="400"
    title="Taxes"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>Property Tax (Current Year): </v-list-item>
      <v-list-item>Get Current Balance Due (PDF)</v-list-item>
      <v-list-item :href="'https://co.crook.or.us/tax-collection'">Pay Your Property Taxes</v-list-item>
      <v-list-item>Tax Payments & History</v-list-item>
      <v-list-item>Tax Code Area: </v-list-item>
    </v-list>
  </v-card>

  <v-card
    class="summaryPage"
    width="400"
    title="Assessment"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>Assessor Property Description: </v-list-item>
      <v-list-item>Assessor Acres: </v-list-item>
      <v-list-item>Property Class: </v-list-item>
    </v-list>
  </v-card>

  <v-card
    class="summaryPage"
    width="400"
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
    width="400"
    title="Valuation"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item :href="'http://apps.lanecounty.org/PropertyAssessmentTaxationSearch/crook/Real/Valuation/' + account_id">Current Year Value Summary</v-list-item>
      <v-list-item></v-list-item>
      <v-list-item></v-list-item>
    </v-list>
  </v-card>
    </v-row>
  </v-container>


</template>

<script>
export default {
  data () {
    return {
      account_id: this.$route.params.account_id
    }
  }
}
</script>

<style>
.summaryPage {
  margin: 10px;
}
</style>
