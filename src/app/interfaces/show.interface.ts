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

interface Episode {
  id: number
  number: number
}
