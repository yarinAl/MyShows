import { getShows as getShowsDAL } from '../DAL/showsDAL'

export const getShows = async () => {
  const showsData = await getShowsDAL()

  // mapping...

  return showsData.data
}
