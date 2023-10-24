<template>

      <v-navigation-drawer
        expand-on-hover
        rail
        style="min-width: 56px;"
      >
        <v-list>
          <v-list-item
            prepend-icon="mdi-folder"
            title="Account Navigation"
            subtitle="subtitle"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-database-outline" title="Summary" value="summary"></v-list-item>
          <v-list-item prepend-icon="mdi-chart-line" title="Valuation" value="valuation"></v-list-item>
          <v-list-item prepend-icon="mdi-bank" title="Tax Information" value="tax_information"></v-list-item>
          <v-list-item prepend-icon="mdi-account-cash-outline" title="Sales" value="sales"></v-list-item>
          <v-list-item prepend-icon="mdi-domain" title="Land and Structures" value="land_and_structures"></v-list-item>
          <v-list-item prepend-icon="mdi-map-legend" title="Tax Map" value="tax_map"></v-list-item>
          <v-list-item prepend-icon="mdi-timeline-clock-outline" title="Tax Lot History" value="tax_lot_history"></v-list-item>
          <v-list-item prepend-icon="mdi-vector-link" title="Related Accounts" value="related_Accounts"></v-list-item>
          <v-list-item prepend-icon="mdi-alert-box-outline" title="Warnings/Notations" value="warnings_notations"></v-list-item>
          <v-list-item prepend-icon="mdi-home-plus-outline" title="Development" value="development"></v-list-item>
          <v-list-item prepend-icon="mdi-map-marker-outline" title="Interactive Map" value="interactive_map"></v-list-item>
          <v-list-item prepend-icon="mdi-ruler-square-compass" title="Surveys" value="surveys"></v-list-item>
        </v-list>
      </v-navigation-drawer>

</template>

<script setup>

</script>


