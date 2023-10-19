import { HttpClient } from '@angular/common/http'
import { Injectable, SecurityContext } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs'
import { ShowFromApi } from '../interfaces/show-from-api.interface'
import { Episode, Season, Show } from '../interfaces/show.interface'

@Injectable()
export class ShowsService {
  private apiUrl = 'https://api.tvmaze.com'
  private apiUrlShows = `${this.apiUrl}/shows`
  private apiUrlSeasons = `${this.apiUrl}/seasons`

  private showsSubject = new BehaviorSubject<Show[] | null>(null)
  shows$ = this.showsSubject.asObservable()

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

  //---------------------------------------------------------------------------
  fetchData(): Observable<Show[]> {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      return of(cachedShows)
    }

    return this.fetchAllShows().pipe(
      map((shows: ShowFromApi[]) =>
        shows.map((show) => this.convertApiShowToShow(show))
      ),
      tap((shows) => {
        this.showsSubject.next(shows)
      })
    )
  }

  private fetchAllShows(): Observable<ShowFromApi[]> {
    return this.http.get<ShowFromApi[]>(this.apiUrlShows)
  }
  //---------------------------------------------------------------------------
  fetchShowById(id: number): Observable<Show> {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      const cachedShow = cachedShows.find((show) => show.id === id)
      if (cachedShow) {
        return of(cachedShow)
      }
    }

    return this.http
      .get<ShowFromApi>(`${this.apiUrlShows}/${id}`)
      .pipe(map((show: ShowFromApi) => this.convertApiShowToShow(show)))
  }
  //---------------------------------------------------------------------------

  fetchSeasons(id: number): Observable<Season[]> {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      const cachedShow = cachedShows.find((show) => show.id === id)
      if (cachedShow && cachedShow.seasons && cachedShow.seasons.length > 0) {
        return of(cachedShow.seasons)
      }
    }

    return this.http.get<Season[]>(`${this.apiUrlShows}/${id}/seasons`).pipe(
      map((seasons: Season[]) =>
        seasons.map((season) => this.convertApiSeasonToSeason(season))
      ),
      tap((seasons) => {
        this.addSeasonsToCache(id, seasons)
      })
    )
  }

  private addSeasonsToCache(showId: number, seasons: Season[]): void {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      const showToUpdate = cachedShows.find((show) => show.id === showId)
      if (showToUpdate) {
        showToUpdate.seasons = seasons
        this.showsSubject.next(cachedShows)
      }
    }
  }
  //---------------------------------------------------------------------------

  fetchEpisodes(
    seasonId: number | null,
    showId: number | null
  ): Observable<Episode[]> {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      const cachedShow = cachedShows.find((show) => show.id === showId)
      if (cachedShow && cachedShow.seasons && cachedShow.seasons.length > 0) {
        const cachedSeason = cachedShow.seasons.find(
          (season) => season.id === seasonId
        )
        if (
          cachedSeason &&
          cachedSeason.episodes &&
          cachedSeason.episodes.length > 0
        ) {
          return of(cachedSeason.episodes)
        }
      }
    }

    return this.http
      .get<Episode[]>(`${this.apiUrlSeasons}/${seasonId}/episodes`)
      .pipe(
        map((episodes: Episode[]) =>
          episodes.map((episode) => this.convertApiEpisodeToEpisode(episode))
        ),
        tap((episodes) => {
          this.addEpisodesToCache(showId, seasonId, episodes)
        })
      )
  }
  private addEpisodesToCache(
    showId: number | null,
    seasonId: number | null,
    episodes: Episode[]
  ): void {
    if (showId === null || seasonId === null) {
      return
    }

    const cachedShows = this.showsSubject.value

    if (!cachedShows) {
      return
    }

    const showToUpdate = cachedShows.find((show) => show.id === showId)
    if (!showToUpdate) {
      return
    }

    const seasonToUpdate = showToUpdate.seasons?.find(
      (season) => season.id === seasonId
    )
    if (!seasonToUpdate) {
      return
    }

    seasonToUpdate.episodes = episodes

    this.showsSubject.next(cachedShows)
  }

  // helping functions
  //---------------------------------------------------------------------------

  private convertApiShowToShow(show: ShowFromApi): Show {
    const summary = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      show.summary
    )

    return {
      id: show.id,
      name: show.name,
      image: show.image.original,
      summary: summary ?? '',
      seasons: (show.seasons = []),
    }
  }
  private convertApiSeasonToSeason(season: Season): Season {
    return {
      id: season.id,
      number: season.number,
      episodes: (season.episodes = []),
    }
  }

  private convertApiEpisodeToEpisode(episode: Episode): Episode {
    return {
      id: episode.id,
      number: episode.number,
      name: episode.name,
    }
  }
}
