import axios from 'axios'
import { EpisodeFromApi } from '../models/episode'

export const getSeasonEpisodes = (seasonId: number) => {
  return axios.get<EpisodeFromApi[]>(
    `https://api.tvmaze.com/seasons/${seasonId}/episodes`
  )
}
