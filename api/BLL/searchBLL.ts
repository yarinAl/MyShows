import { searchShows as searchShowsDAL } from '../DAL/searchDAL'
import { ShowSearchFromApi } from '../models/search'
import { convertApiShowToShow } from './showsBLL'

export const getSearchResults = async (search: string) => {
  const searchShowsData = await searchShowsDAL(search)

  const shows = searchShowsData
    .slice(0, 5)
    .map((searchShow: ShowSearchFromApi) =>
      convertApiShowToShow(searchShow.show)
    )
  return shows
}
