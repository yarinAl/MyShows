import { getSeasonEpisodes as getSeasonEpisodesDAL } from '../DAL/seasonsDAL'
import cache from '../cache/cache'
import { Episode, EpisodeFromApi } from '../models/episode'
import { sanitize } from '../sanitizer'

export const getSeasonEpisodes = async (seasonId: number) => {
  const getSeasonEpisodesCache = cache.get<Episode[]>(
    `getSeasonEpisodes:${seasonId}`
  )

  if (getSeasonEpisodesCache) {
    return getSeasonEpisodesCache
  }

  const SeasonEpisodesData = await getSeasonEpisodesDAL(seasonId)

  const res = SeasonEpisodesData.map((seasonEpisode: EpisodeFromApi) =>
    convertApiEpisodeToEpisode(seasonEpisode)
  )

  cache.set<Episode[]>(`getSeasonEpisodes:'${seasonId}`, res)

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
