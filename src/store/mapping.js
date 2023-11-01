import { defineStore } from 'pinia'

export const useMappingStore = defineStore('mapping', {
  state: () => ({
    property: [],
  }),
  getters: {
    getMapsData(state){
      return state.property
    }
  },
  actions: {
    fetchMapsData: async function () {
      try {
        //
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
