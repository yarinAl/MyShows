import api from '../apiCaller'
import { EpisodeFromApi } from '../models/episode'

export const getSeasonEpisodes = (seasonId: number) => {
  return api.get<EpisodeFromApi[]>(
    `https://api.tvmaze.com/seasons/${seasonId}/episodes`
  )
}
