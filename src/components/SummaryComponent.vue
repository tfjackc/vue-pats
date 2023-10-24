<template>

<v-responsive class="align-center text-center fill-height">
  <div class="py-14" />
<!--  <v-row class="d-flex align-center justify-center">-->
    <v-col cols="auto">
      <h1>Summary Page</h1>
      <p>Account ID is : {{ account_id }}</p>

    </v-col>
    <v-col cols="auto">

    </v-col>
<!--  </v-row>-->
</v-responsive>

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

