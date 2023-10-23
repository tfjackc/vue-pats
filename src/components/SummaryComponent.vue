<template>
<h1>Summary Page</h1>
  <p>Account ID is : {{ account_id }}</p>
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

