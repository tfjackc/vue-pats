<template>
<h1>Interactive Map Page</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {ref} from "vue";
const route = useRoute()
const account_id = ref(route.params.account_id)
</script>
