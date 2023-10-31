<template>
  <div id="map-div"></div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from "vue";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Home from "@arcgis/core/widgets/Home";
import Map from "@arcgis/core/Map";
import Query from "@arcgis/core/rest/support/Query";
import Graphic from "@arcgis/core/Graphic";

const route = useRoute()
const account_id = ref(route.params.account_id)

const map = new Map();
map.basemap = "topo-vector";

const view = new MapView();

onMounted(() => {
  const viewProps = {
    container: "map-div",
    map: map,
    zoom: 12,
    center: [-120.8345, 44.2998]
  }
  view.set(viewProps);
})

</script>

