import api from '../apiCaller'
import { ShowFromApi } from '../models/show'

const searchApi = 'https://api.tvmaze.com/search/shows?q='

export const getSearchResults = (search: string) => {
  console.log(searchApi + search)
  return api.get<ShowFromApi[]>(searchApi + String(search))
}
