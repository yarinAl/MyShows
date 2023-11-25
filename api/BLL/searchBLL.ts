import { searchShows as searchShowsDAL } from '../DAL/searchDAL'
import { ShowSearchFromApi } from '../models/search'
import { ShowSearch, ShowSearchRawFromApi } from '../models/show'

export const getSearchResults = async (search: string) => {
  const searchShowsData = await searchShowsDAL(search)

  const shows = searchShowsData
    .slice(0, 5)
    .map((searchShow: ShowSearchFromApi) =>
      convertApiShowToShowSearch(searchShow.show)
    )
  return shows
}

export function convertApiShowToShowSearch(
  show: ShowSearchRawFromApi
): ShowSearch {
  return {
    id: show.id,
    name: show.name,
    image:
      show.image?.original ?? 'https://freesvg.org/img/1699712564Centaur2.png',
    language: show.language,
    premiered: show.premiered,
    rating: show.rating.average ?? '--',
  }
}
