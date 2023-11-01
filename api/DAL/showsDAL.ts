import axios from 'axios'
import { SeasonFromApi } from '../models/season'
import { ShowFromApi } from '../models/show'

export const getShows = () => {
  return axios.get<ShowFromApi[]>('https://api.tvmaze.com/shows')
}

export const getShow = (id) => {
  return axios.get<ShowFromApi>(`https://api.tvmaze.com/shows/${id}`)
}

export const getShowSeasons = (id) => {
  return axios.get<SeasonFromApi[]>(
    `https://api.tvmaze.com/shows/${id}/seasons`
  )
}
