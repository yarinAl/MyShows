import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Episode, Season, Show } from '../interfaces/show.interface'

@Injectable()
export class ShowsService {
  private apiUrl = 'http://localhost:3000'
  private apiUrlShows = `${this.apiUrl}/shows`
  private apiUrlSeasons = `${this.apiUrl}/seasons`
  private apiUrlEpisode = `${this.apiUrl}/episodes`

  constructor(private http: HttpClient) {}

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.apiUrlShows)
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrlShows}/${id}`)
  }

  getSeasons(showId: number): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrlShows}/${showId}/seasons`)
  }

  getEpisodes(seasonId: number): Promise<Episode[]> {
    return new Promise(async (res, rej) => {
      this.http
        .get<Episode[]>(`${this.apiUrlSeasons}/${seasonId}/episodes`)
        .subscribe((episodes: Episode[]) => {
          res(episodes)
        })
    })
  }

  getEpisode(episodeId: number) {
    return this.http.get<Episode>(`${this.apiUrlEpisode}/${episodeId}`)
  }
}
