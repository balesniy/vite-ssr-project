import {defineStore} from 'pinia'
import ky from 'ky-universal'

export const useSearch = defineStore('search', {
  state: () => ({
    cabins: [],
    years: [],
    price: [],
    countries: [],
    countriesOptions: [],
    type: '',
  }),
  actions: {
    async fetchCountries() {
      const { data: countriesOptions } = await ky.get('https://searadar.com/api/search/geo-suggest').json()
      this.countriesOptions = countriesOptions
    },
  }
})
