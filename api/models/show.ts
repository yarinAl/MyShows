import { Season } from './season'

export interface ShowFromApi {
  id: number
  name: string
  image: {
    original: string
  }
  summary: string
}

export interface Show {
  id: number
  name: string
  image: string
  summary: string
  seasons: Season[]
}
