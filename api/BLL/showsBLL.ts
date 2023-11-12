import {
  getShow as getShowDAL,
  getShowSeasons as getShowSeasonsDAL,
  getShows as getShowsDAL,
} from '../DAL/showsDAL'
import cache from '../cache/cache'
import { Season, SeasonFromApi } from '../models/season'
import { Show, ShowFromApi } from '../models/show'
import { sanitize } from '../sanitizer'

export const getShows = async (count?: number) => {
  const getShowsCache = cache.get<Show[]>('getShows')

  if (getShowsCache) {
    return count ? getShowsCache.slice(0, count) : getShowsCache
  }

  const showsData = await getShowsDAL()

  const res = showsData.map((show: ShowFromApi) => convertApiShowToShow(show))

  cache.set<Show[]>('getShows', res)

  return count ? res.slice(0, count) : getShowsCache
}

export const getShow = async (showId: number) => {
  const getShowCache = cache.get<Show>(`getShow:${showId}`)

  if (getShowCache) {
    return getShowCache
  }

  const showData = await getShowDAL(showId)
  const res = convertApiShowToShow(showData)

  cache.set<Show>('getShow', res)

  return res
}

export const getShowSeasons = async (showId: number): Promise<Season[]> => {
  const getShowSeasonsCache = cache.get<Season[]>(`getShowSeasons:${showId}`)

  if (getShowSeasonsCache) {
    return getShowSeasonsCache
  }

  const showSeasonsData = await getShowSeasonsDAL(showId)

  const res = showSeasonsData.map((season: SeasonFromApi) =>
    convertApiSeasonToSeason(season)
  )

  cache.set<Season[]>(`getShowSeasons:${showId}`, res)

  return res
}

export function convertApiShowToShow(show: ShowFromApi): Show {
  const summary = sanitize(show.summary)

  return {
    id: show.id,
    name: show.name,
    image:
      show.image?.original ?? 'https://freesvg.org/img/1699712564Centaur2.png',
    summary: summary ?? '',
    seasons: [],
  }
}

function convertApiSeasonToSeason(season: SeasonFromApi): Season {
  return {
    id: season.id,
    number: season.number,
    episodes: [],
  }
}
