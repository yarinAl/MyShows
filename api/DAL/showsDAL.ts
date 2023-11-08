import api from '../apiCaller'
import { SeasonFromApi } from '../models/season'
import { ShowFromApi } from '../models/show'

const showsApi = 'https://api.tvmaze.com/shows'

export const getShows = () => {
  return api.get<ShowFromApi[]>(showsApi)
}

export const getShow = (id: number) => {
  return api.get<ShowFromApi>(`${showsApi}/${id}`)
}

export const getShowSeasons = (id: number): Promise<SeasonFromApi[]> => {
  return api.get<SeasonFromApi[]>(`${showsApi}/${id}/seasons`)
}
