import { getSeasonEpisodes as getSeasonEpisodesDAL } from '../DAL/seasonsDAL'
import cache from '../cache'
import { Episode, EpisodeFromApi } from '../models/episode'
import { sanitize } from '../sanitizer'

export const getSeasonEpisodes = async (seasonId) => {
  const getSeasonEpisodesCache = cache.get('getSeasonEpisodes:' + seasonId)
  if (getSeasonEpisodesCache) {
    return getSeasonEpisodesCache
  }
  const SeasonEpisodesData = await getSeasonEpisodesDAL(seasonId)
  const res = SeasonEpisodesData.data.map((seasonEpisode: EpisodeFromApi) =>
    convertApiEpisodeToEpisode(seasonEpisode)
  )
  cache.set('getSeasonEpisodes:' + seasonId, res)

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
