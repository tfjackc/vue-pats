// Utilities
import { defineStore } from 'pinia'
//import { ref } from 'vue'
import axios from "axios";

export const usePropertyStore = defineStore('property', {
  state: () => ({
    property: [],
  }),
  getters: {
    getProperty(state){
      return state.property
    }
  },
  actions: {
    fetchProperty: async function (account) {
      try {
        const propertyUrl = `https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/11/query?where=account_id+%3D+%27${account}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`;
        const response = await axios.get(propertyUrl);
        for (const layer of response.data.features) {
          this.property = layer.attributes
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})


export const usePropertyValuesStore = defineStore('property_values', {
  state: () => ({
    property_values: [],
    years: [],
    rmv_total: [],
    max_av: []
  }),
  getters: {
    getPropertyValues(state){
      return state.property_values, state.years, state.rmv_total, state.max_av
    }
  },
  actions: {
    fetchPropertyValues: async function (account) {
      try {
        const propertyValuesUrl = `https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/12/query?where=account_id+%3D+%27${account}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=year&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`
        const response = await axios.get(propertyValuesUrl);
        for (const layer of response.data.features) {
          this.property_values.push(layer.attributes)
          this.years.push(layer.attributes.year)
          this.rmv_total.push(layer.attributes.rmv_total)
          this.max_av.push(layer.attributes.max_av)
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})

