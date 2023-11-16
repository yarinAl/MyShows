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

export interface ShowSearchRawFromApi {
  id: number
  name: string
  image: Image | null
  language: string
  premiered: string
  rating: {
    average: string
  }
}

export interface Show {
  id: number
  name: string
  image: string
  summary: string
  seasons: Season[]
}

export interface ShowSearch {
  id: number
  name: string
  image: string
  language: string
  premiered: string
  rating: string
}
