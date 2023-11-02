import axios from 'axios'
import { EpisodeFromApi } from '../models/episode'

export const getEpisode = (id: number) => {
  return axios.get<EpisodeFromApi>(`https://api.tvmaze.com/episodes/${id}`)
}
