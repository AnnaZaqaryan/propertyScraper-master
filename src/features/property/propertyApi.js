
import { axClinet } from "../../axiosUtil"

export function fethAllPropertiesApi(data) {
  return axClinet.get(`/api/properties?&page=${data.currentPage}&size=10&sortBy=${data.sort.field}&sortDir=${data.sort.dir}&state=${data.state}&suburb=${data.suburb}&propertyType=${data.types}&srapeHistory=${data.history}`)
    .then(response => {
      return response.data
    })

}


export function exportDataApi(data) {
  return axClinet.get(`api/properties-export?suburb=${data.suburb}&state=${data.state}&propertyType=${data.types}&srapeHistory=${data.history}`, { responseType: 'blob' })
  .then(response => {
    const href = URL.createObjectURL(response.data);

    // create "a" HTLM element with href to file & click
    const link = document.createElement('a');
    link.href = href;

    link.setAttribute('download', 'export.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  })
}

export function fetchAllPropertyTypesFilterApi() {
  return axClinet.get(`/api/property-types-filter`)
    .then(response => {
      return response.data
    })
}

export function fetchAllPropertyTypeScrapeHistoryApi() {
  return axClinet.get(`/api/scrape-history`)
    .then(response => {
      return response.data
    })
}



