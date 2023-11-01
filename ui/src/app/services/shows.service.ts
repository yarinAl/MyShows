import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, firstValueFrom, of, tap } from 'rxjs'
import { Episode, Season, Show } from '../interfaces/show.interface'

@Injectable()
export class ShowsService {
  private apiUrl = 'http://localhost:3000'
  private apiUrlShows = `${this.apiUrl}/shows`
  private apiUrlSeasons = `${this.apiUrl}/seasons`
  private apiUrlEpisode = `${this.apiUrl}/episodes`

  private showsSubject = new BehaviorSubject<Show[] | null>(null)
  shows$ = this.showsSubject.asObservable()

  constructor(private http: HttpClient) {}

  getShows(): Observable<Show[]> {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      return of(cachedShows)
    }

    return this.http.get<Show[]>(this.apiUrlShows).pipe(
      tap((shows) => {
        this.showsSubject.next(shows)
      })
    )
  }

  getShow(id: number): Observable<Show> {
    const cachedShow = this.getCachedShow(id)

    if (cachedShow) {
      return of(cachedShow)
    }

    return this.http.get<Show>(`${this.apiUrlShows}/${id}`)
  }

  getSeasons(showId: number): Observable<Season[]> {
    const cachedShow = this.getCachedShow(showId)
    if (cachedShow && cachedShow.seasons && cachedShow.seasons.length > 0) {
      return of(cachedShow.seasons)
    }

    return this.http
      .get<Season[]>(`${this.apiUrlShows}/${showId}/seasons`)
      .pipe(
        tap((seasons) => {
          this.addSeasonsToCache(showId, seasons)
        })
      )
  }

  getEpisodes(seasonId: number, showId: number): Promise<Episode[]> {
    return new Promise(async (res, rej) => {
      const show = await firstValueFrom(this.getShow(showId))
      const season = show.seasons.find((s) => s.id === seasonId)
      if (season && season.episodes.length > 0) {
        res(season.episodes)
        return
      }

      this.http
        .get<Episode[]>(`${this.apiUrlSeasons}/${seasonId}/episodes`)
        .pipe(
          tap((episodes: Episode[]) => {
            this.addEpisodesToCache(showId, seasonId, episodes)
          })
        )
        .subscribe((episodes: Episode[]) => {
          res(episodes)
        })
    })
  }

  getEpisode(episodeId: number) {
    return this.http.get<Episode>(`${this.apiUrlEpisode}/${episodeId}`)
  }

  private addSeasonsToCache(showId: number, seasons: Season[]): void {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      const foundIndex = cachedShows.findIndex((show) => show.id === showId)

      if (foundIndex > -1) {
        cachedShows[foundIndex].seasons = seasons

        this.showsSubject.next(cachedShows)
      }
    }
  }

  private addEpisodesToCache(
    showId: number,
    seasonId: number,
    episodes: Episode[]
  ): void {
    const cachedShows = this.showsSubject.value

    const showToUpdate = this.getCachedShow(showId)
    if (showToUpdate) {
      const seasonToUpdate = showToUpdate.seasons?.find(
        (season) => season.id === seasonId
      )
      if (seasonToUpdate) seasonToUpdate.episodes = episodes
    }

    this.showsSubject.next(cachedShows)
  }

  private getCachedShow(id: number): Show | undefined {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      return cachedShows.find((show) => show.id === id)
    }

    return
  }
}
