
import { axClinet } from "../../axiosUtil"

export function fetchAllPropertyTypesApi() {
  return axClinet.get(`/api/property-types`)
    .then(response => {
      return response.data
    })

}


export function fetchAllLocaltionTypesApi(arg) {
  
  return axClinet.get(`/api/location-search?loc=` + arg)
    .then(response => {
      return response.data
    })

}


export function scrapStartApi(obj) {

  return axClinet.post(`/scrape/scr-start`, obj)
    .then(response => {
      return response.data
    })

}

export function scraperStopApi() {
  
  //ar.push(e)
  return axClinet.get(`/scrape/scr-stop`)
    .then(response => {
      return response.data
    })

}
