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
