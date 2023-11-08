import { Season } from './season'

interface Image {
  original: string
}

export interface ShowFromApi {
  id: number
  name: string
  image: Image | null
  summary: string
}

export interface Show {
  id: number
  name: string
  image: string | null
  summary: string
  seasons: Season[]
}
