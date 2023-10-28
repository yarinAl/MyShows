export interface EpisodeFromApi {
  id: number
  number: number
  name: string
  image: {
    original: string
  }
  summary: string
}

export interface Episode {
  id: number
  number: number
  name: string
  image: string
  summary: string
}
