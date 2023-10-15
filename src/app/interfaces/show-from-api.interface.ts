import { Season } from './show.interface'

export interface ShowFromApi {
  id: number
  name: string
  image: {
    original: string
  }
  summary: string
  seasons: Season[]
}
