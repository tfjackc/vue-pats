// Utilities
import { defineStore } from 'pinia'
//import { ref } from 'vue'
import axios from "axios";
// export const usePropertyTableStore = defineStore('property_table', {
//   state: (account) => {
//     const table = ref(null)
//     const propertyTableUrl = `https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/11/query?where=account_id+%3D+%27${account}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`;
//
//     axios.get(propertyTableUrl)
//       .then((response) => {
//         const propertyTableUrlResponse = response.data.features
//         for (const items of propertyTableUrlResponse) {
//           table.value = items.attributes
//         }
//       })
//       .catch((error) => {
//         console.error("An error occurred:", error);
//       })
//
//     return ({ table });
//   },
// })


export const usePropertyTableStore = defineStore('property_table', {
  state: () => ({
    property_table: [],
  }),
  getters: {
    getPropertyTable(state){
      return state.property_table
    }
  },
  actions: {
    async fetchPropertyTable(account) {
      try {
        const propertyTableUrl = `https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/11/query?where=account_id+%3D+%27${account}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`;

        const data = await axios.get(propertyTableUrl)
        this.property_table = data.data
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
