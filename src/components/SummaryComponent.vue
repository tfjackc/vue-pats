<template>

  <v-container>
    <v-row class="d-flex align-center justify-center">
<!--    <v-icon icon="mdi-database-outline" />-->
    <h1>Summary for Account: {{ account_id }}</h1>
    </v-row>
  </v-container>

  <v-card
    width="400"
    title="Account Information"
  >
  <v-list>
    <v-list-item>Mailing Name: </v-list-item>
    <v-list-item>Map and Tax Lot: </v-list-item>
    <v-list-item>Situs Address: </v-list-item>
    <v-list-item>Tax Status: </v-list-item>
  </v-list>
  </v-card>

  <v-card
    width="400"
    title="Ownership"
  >
    <v-list>
      <v-list-item>Mailing To: </v-list-item>
      <v-list-item :href="'https://co.crook.or.us/assessor/webform/mailing-address-change-request-form'">Change of Mailing Address Form</v-list-item>
      <v-list-item :href="'https://geo.co.crook.or.us/portal/apps/webappviewer/index.html?id=370f5ec185b945db9d92999cef827982&query=Taxlots,Maptaxlot,151629B002600'">View Overview Map</v-list-item>
    </v-list>
  </v-card>


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

