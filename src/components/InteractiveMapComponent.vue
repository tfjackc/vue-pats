<template>
<h1 id="map-header">Interactive Map Page</h1>
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
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import * as query from "@arcgis/core/rest/query.js";
import Sublayer from "@arcgis/core/layers/support/Sublayer.js";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/size";

const route = useRoute()
const account_id = ref(route.params.account_id)

const map = new Map();
map.basemap = "topo-vector";

const view = new MapView();

let basemapToggle = new BasemapToggle({
  view: view,
  nextBasemap: "hybrid"
});
// return home button
let homeWidget = new Home({
  view: view
});

// adds the home widget to the top left corner of the MapView

//
// let legend = new Legend({
//   view: view,
//   container: "legend"
// });

const taxlotRenderer = {
  type: "simple",
  symbol: {
    type: "simple-fill",
    style: "none",
    outline : {
      width: 0.5,
      color: [0, 0, 0, 1]
    },
    color: [0, 0, 0, 0.5]
  },
  label: "Taxlots"
};

// create renderder for subdivisions
const subdivisionRenderer = {
  type: "simple",
  symbol: {
    type: "simple-fill",
    style: "none",
    outline: {
      color: [165, 19, 200, 1]
    },
    color: [245, 208, 253, 0.5]
  },
  label: "Subdivisions"
};
// add feature from MapServer
const landGroup = new MapImageLayer({
  url: "https://geo.co.crook.or.us/server/rest/services/publicApp/landGroup/MapServer",
  sublayers: [{
    id: 0,
    renderer: subdivisionRenderer,
    visible: false,
    popupTemplate: {
      title: "Subdivision: {name}"
    },

  },
    {
      id: 1,
      renderer: taxlotRenderer,
      visible: true,
      popupTemplate: {
        title: "{MAPTAXLOT}",
        content: "Owner Name: {OWNER_NAME} <br /> Zone: {ZONE} <br /> Account: {ACCOUNT} <br /> PATS Link: <a href={PATS_LINK}>PATS Link</a> <br /> Tax Map Link: <a href={TAX_MAP_LINK}>Tax Map Link</a> <br /> Tax Card Link: <a href={TAX_CARD_LINK}>Tax Card Link</a>",
      }
    },
    {
      id: 3,
      visible: false
    },
    {
      id: 4,
      visible: false
    },
    {
      id: 5,
      visible: false
    },
    {
      id: 6,
      visible: false,
      opacity: 0.6
    },
    {
      id: 7,
      visible: true,
      opacity: 0.5
    }
  ]
});

const mtLayer = landGroup.sublayers.getItemAt(1);

// const query = new Query({
//   outFields: ["*"],
//   where: `account_id = '${account_id.value}'`
// });
//


onMounted(() => {
  const viewProps = {                    // Object with property data
    container: "map-div",
    map: map,
    zoom: 12,
    center: [ -120.8345, 44.2998 ]
  };

  view.set(viewProps);
  view.ui.add(homeWidget, "top-left");
  view.ui.add(basemapToggle, "top-left");
  view.when(() => {
    map.layers.push(landGroup);
    const mtLayer = landGroup.findSublayerById(1);

    mtLayer.createFeatureLayer()
      .then(function(featureLayer){
        return featureLayer.load();
      })
      .then(createParameters);
    })
  })


function createParameters (featureLayer) {
  console.log("are we here??")
  featureLayer.queryFeatures({
    geometry: featureLayer.geometry,
    where: `ACCOUNT = ${account_id.value}`,
    returnGeometry: true,
    outFields: ["*"],
    outSpatialReference: view.map.basemap.baseLayers.items[0].spatialReference
  }).then((featureSet) => {

    // map.layers.push(featureSet)
    console.log(featureSet)
    //view.goTo(featureSet.extent)
    // view.openPopup({
    //   features: featureSet.features
    // });
  })
}

// colorRendererCreator.createContinuousRenderer(colorParams.value)
//   .then(function(response){
//     mtLayer.renderer = response.renderer;
//   });
// const mtqueryfunction = async () => {
//   console.log("in the function")
//   const loadQuery = new Query();
//   loadQuery.outFields = ["*"];
//   loadQuery.returnGeometry = true;
//   loadQuery.where = `account_id = '${account_id.value}'`;
//   const mtLayer = landGroup.findSublayerById(1);

  //const featureSet = await mtLayer.queryFeatures(loadQuery);
  // if (featureSet.featureResult) {
  //   console.log(featureSet.featureResult.features);
  //
  //   return featureSet.featureResult.features
  //   // view.openPopup({
  //   //   features: featureSet.featureResult.features
  //   // })
  // } else {
  //   console.log("No features found for the query.");
  // }
// }

// when a tax lot is clicked, get attribute information
view.on("click", function(evt) {

  var query = new Query();
  query.geometry = evt.mapPoint;
  query.outFields = ["*"];
  query.returnGeometry = true;
  query.spatialRelationship = "intersects";
  mtLayer.queryFeatures(query).then(function(results) {
    console.log(results)
  });
});

</script>

<style>
@import "https://js.arcgis.com/4.28/@arcgis/core/assets/esri/themes/light/main.css";

#map-div {
  height: 100%;
  width: 100%;
}

#map-header {
  margin-left: 15px;
}
</style>
