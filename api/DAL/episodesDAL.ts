import api from '../apiCaller'
import { EpisodeFromApi } from '../models/episode'

export const getEpisode = (id: number) => {
  return api.get<EpisodeFromApi>(`https://api.tvmaze.com/episodes/${id}`)
}
