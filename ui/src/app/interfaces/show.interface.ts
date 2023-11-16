export interface Show {
  id: number
  name: string
  image: string
  summary: string
  seasons: Season[]
}

export interface Season {
  id: number
  number: number
  episodes: Episode[]
}

export interface Episode {
  id: number
  season: number
  number: number
  name: string
  image: string
  summary: string
}

export interface ShowSearch {
  id: number
  name: string
  image: string
  language: string
  premiered: string
  rating: string
}
