import { getEpisode as getEpisodeDAL } from '../DAL/episodesDAL'
import cache from '../cache/cache'
import { Episode, EpisodeFromApi } from '../models/episode'
import { sanitize } from '../sanitizer'

export const getEpisode = async (episodeId: number) => {
  const getEpisodeCache = cache.get<Episode>(`getEpisode:${episodeId}`)

  if (getEpisodeCache) {
    return getEpisodeCache
  }

  const episodeData = await getEpisodeDAL(episodeId)

  const res = convertApiEpisodeToEpisode(episodeData)

  cache.set<Episode>(`getEpisode:${episodeId}`, res)

  return res
}

function convertApiEpisodeToEpisode(episode: EpisodeFromApi): Episode {
  const summary = sanitize(episode.summary)

  const imageUrl =
    episode.image && episode.image.original
      ? episode.image.original
      : 'https://t.ly/2dSjj'

  return {
    id: episode.id,
    season: episode.season,
    number: episode.number,
    name: episode.name,
    image: imageUrl,
    summary: summary ?? '',
  }
}
