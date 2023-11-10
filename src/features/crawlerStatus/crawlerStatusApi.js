
import { axClinet } from "../../axiosUtil"

export function fetchCrawlerStatus() {


  return axClinet.get(`/scrape/status`)
    .then(response => {
      return response.data
    })

}
