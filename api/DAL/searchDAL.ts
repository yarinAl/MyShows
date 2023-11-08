import api from '../apiCaller'
import { ShowSearchFromApi } from '../models/search'

const searchApi = 'https://api.tvmaze.com/search'

export const searchShows = (search: string) => {
  return api.get<ShowSearchFromApi[]>(`${searchApi}/shows?q=${search}`)
}
