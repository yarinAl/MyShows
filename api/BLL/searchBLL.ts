import { getSearchResults as getSearchResultsDAL } from '../DAL/searchDAL'

export const getSearchResults = async (search: string) => {
  const searchResults = await getSearchResultsDAL(search)
  return searchResults
}
