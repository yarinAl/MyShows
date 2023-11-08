export interface Show {
  id: number
  name: string
  image: string | null
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
  number: number
  name: string
  image: string
  summary: string
}
