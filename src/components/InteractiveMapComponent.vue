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

let basemapToggle = new BasemapToggle({
  view: view,
  nextBasemap: "hybrid"
});
// return home button
let homeWidget = new Home({
  view: view
});

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
      },
        //definitionExpression: `ACCOUNT = ${account_id.value}`
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

const taxlotLayer = landGroup.findSublayerById(1);

onMounted(() => {
  const viewProps = {
    container: "map-div",
    map: map,
    zoom: 12,
    center: [ -120.8345, 44.2998 ],
      popupEnabled: true,
      popup: {
          dockEnabled: true,
          dockOptions: {
              // dock popup at bottom-right side of view
              buttonEnabled: false,
              breakpoint: false,
              position: "bottom-right"
          }
      }
  };

    view.set(viewProps);
    view.ui.add(homeWidget, "top-left");
    view.ui.add(basemapToggle, "top-left");
    view.when(() => {
        view.map.add(landGroup);

        taxlotLayer.createFeatureLayer()
            .then(function(featureLayer){
                return featureLayer.load();
            })
            .then(queryNewFeatureLayer);
    })
})

//create graphic for mouse point click
const pointGraphic = new Graphic({
    symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [0, 0, 139],
        outline: {
            color: [255, 255, 255],
            width: 1.5
        }
    }
});

// Create graphic for distance buffer
const bufferGraphic = new Graphic({
    symbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [173, 216, 230, 0.8],
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1
        }
    }
});

function queryNewFeatureLayer (taxlotLayer) {
    taxlotLayer.popupTemplate = taxlotLayer.createPopupTemplate();
    let queryTaxlots = taxlotLayer.createQuery();
    queryTaxlots.geometry = taxlotLayer.geometry
    queryTaxlots.where = `ACCOUNT = ${account_id.value}`
    queryTaxlots.outFields = ["*"]
    queryTaxlots.returnQueryGeometry = true
    queryTaxlots.outSpatialReference = view.map.basemap.baseLayers.items[0].spatialReference
    taxlotLayer.queryFeatures(queryTaxlots).then((featureSet) => {
        displayResults(featureSet);
    })

}
function displayResults(fset) {
 fset.features.forEach(function(taxlots) {
     bufferGraphic.geometry = taxlots.geometry;
     view.graphics.add(bufferGraphic);
     view.goTo(bufferGraphic.geometry.extent)
     pointGraphic.geometry = taxlots.geometry.centroid;
     view.graphics.add(pointGraphic);

     console.log(fset.features)

     view.openPopup({
         location: pointGraphic.geometry,
         features: fset.features,
         featureMenuOpen: true
     })

 })
}
// when a tax lot is clicked, get attribute information
    view.on("click", function (evt) {
        var query = new Query();
        query.geometry = evt.mapPoint;
        query.outFields = ["*"];
        query.returnGeometry = true;
        query.spatialRelationship = "intersects";
        taxlotLayer.queryFeatures(query).then(function (results) {
            console.log(results)
        });
    });
</script>
