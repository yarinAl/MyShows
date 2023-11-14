export interface EpisodeFromApi {
  id: number
  season: number
  number: number
  name: string
  image: {
    original: string
  }
  summary: string
}
