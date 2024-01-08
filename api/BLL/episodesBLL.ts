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
      : 'data:image/png;base64,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'

  return {
    id: episode.id,
    season: episode.season,
    number: episode.number,
    name: episode.name,
    image: imageUrl,
    summary: summary ?? '',
  }
}
