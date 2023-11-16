import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Episode, Season, Show, ShowSearch } from '../interfaces/show.interface'

@Injectable()
export class ShowsService {
  private apiUrl = 'http://localhost:3000'
  private apiUrlShows = `${this.apiUrl}/shows`
  private apiUrlSeasons = `${this.apiUrl}/seasons`
  private apiUrlEpisode = `${this.apiUrl}/episodes`
  private apiUrlSearch = `${this.apiUrl}/search`

  constructor(private http: HttpClient) {}

  getShows(count?: Number): Observable<Show[]> {
    return this.http.get<Show[]>(
      `${this.apiUrlShows}${count ? `?count=${count}` : ''}`
    )
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrlShows}/${id}`)
  }

  getSeasons(showId: number): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrlShows}/${showId}/seasons`)
  }

  getEpisodes(seasonId: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(
      `${this.apiUrlSeasons}/${seasonId}/episodes`
    )
  }

  getEpisode(episodeId: number) {
    return this.http.get<Episode>(`${this.apiUrlEpisode}/${episodeId}`)
  }

  getSearchResults(search: string) {
    return this.http.get<ShowSearch[]>(`${this.apiUrlSearch}?q=${search}`)
  }
}
