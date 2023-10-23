<template>
  <v-app-bar  :elevation="24">
    <v-app-bar-title>
      <v-icon icon="mdi-home" />
      Crook County Property Search
    </v-app-bar-title>
    <v-btn @click="toggleTheme"><v-icon icon="mdi-theme-light-dark" /></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
