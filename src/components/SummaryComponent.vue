<template>

<v-responsive class="fill-height">
  <div class="py-14" />
<!--  <v-row class="d-flex align-center justify-center">-->
    <v-col cols="auto">
      <h1>Summary Page</h1>
      <p>Account ID is : {{ account_id }}</p>
    </v-col>
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

