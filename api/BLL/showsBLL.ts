import {
  getShow as getShowDAL,
  getShowSeasons as getShowSeasonsDAL,
  getShows as getShowsDAL,
} from '../DAL/showsDAL'
import cache from '../cache'
import { Season, SeasonFromApi } from '../models/season'
import { Show, ShowFromApi } from '../models/show'
import { sanitize } from '../sanitizer'

export const getShows = async () => {
  const getShowsCache = cache.get('getShows')
  if (getShowsCache) {
    return getShowsCache
  }
  const showsData = await getShowsDAL()
  const res = showsData.data.map((show: ShowFromApi) =>
    convertApiShowToShow(show)
  )
  cache.set('getShows', res)

  return res
}

export const getShow = async (id) => {
  const showData = await getShowDAL(id)
  const res = convertApiShowToShow(showData.data)

  return res
}

export const getShowSeasons = async (showId) => {
  const getShowSeasonsCache = cache.get('getShowSeasons:' + showId)
  if (getShowSeasonsCache) {
    return getShowSeasonsCache
  }

  const showSeasonsData = await getShowSeasonsDAL(showId)
  const res = showSeasonsData.data.map((season: SeasonFromApi) =>
    convertApiSeasonToSeason(season)
  )
  cache.set('getShowSeasons:' + showId, res)

  return res
}

function convertApiShowToShow(show: ShowFromApi): Show {
  const summary = sanitize(show.summary)

  return {
    id: show.id,
    name: show.name,
    image: show.image.original,
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
