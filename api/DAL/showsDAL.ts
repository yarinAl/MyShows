import axios from 'axios'
import { SeasonFromApi } from '../models/season'
import { ShowFromApi } from '../models/show'

const showsApi = 'https://api.tvmaze.com/shows'

export const getShows = () => {
  return axios.get<ShowFromApi[]>(showsApi)
}

export const getShow = (id: number) => {
  return axios.get<ShowFromApi>(`${showsApi}/${id}`)
}

export const getShowSeasons = (id: number) => {
  return axios.get<SeasonFromApi[]>(`${showsApi}/${id}/seasons`)
}
