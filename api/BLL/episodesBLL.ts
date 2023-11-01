import { getEpisode as getEpisodeDAL } from '../DAL/episodesDAL'
import cache from '../cache'
import { Episode, EpisodeFromApi } from '../models/episode'
import { sanitize } from '../sanitizer'

export const getEpisode = async (episodeId) => {
  const getEpisodeCache = cache.get('getEpisode:' + episodeId)
  if (getEpisodeCache) {
    return getEpisodeCache
  }
  const episodeData = await getEpisodeDAL(episodeId)
  const res = convertApiEpisodeToEpisode(episodeData.data)
  cache.set('getEpisode:' + episodeId, res)

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
    number: episode.number,
    name: episode.name,
    image: imageUrl,
    summary: summary ?? '',
  }
}
