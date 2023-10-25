import axios from "axios";
import { ref } from 'vue';
export async function loadSummaryData(account) {
  const property_table = ref(null)
  const propertyTableUrl = `https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/11/query?where=account_id+%3D+%27${account}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`;

  axios.get(propertyTableUrl)
    .then((response) => {
      const propertyTableUrlResponse = response.data.features
      for (const items of propertyTableUrlResponse) {
        property_table.value = items.attributes
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
    return { property_table }
}

