export interface EpisodeFromApi {
  id: number
  number: number
  name: string
  image: {
    original: string
  }
  summary: string
}
