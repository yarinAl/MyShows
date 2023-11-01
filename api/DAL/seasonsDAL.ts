import axios from 'axios'
import { EpisodeFromApi } from '../models/episode'

export const getSeasonEpisodes = (seasonId) => {
  return axios.get<EpisodeFromApi[]>(
    `https://api.tvmaze.com/seasons/${seasonId}/episodes`
  )
}
