import { Episode } from './episode'

export interface SeasonFromApi {
  id: number
  number: number
}

export interface Season {
  id: number
  number: number
  episodes: Episode[]
}
