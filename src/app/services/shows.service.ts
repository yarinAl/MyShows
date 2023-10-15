import { HttpClient } from '@angular/common/http'
import { Injectable, SecurityContext } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs'
import { EpisodesFromApi } from '../interfaces/episodes-from-api.interface'
import { ShowFromApi } from '../interfaces/show-from-api.interface'
import { Season, Show } from '../interfaces/show.interface'

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
        console.log(shows)
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
    console.log(cachedShows)

    if (cachedShows) {
      const cachedShow = cachedShows.find((show) => show.id === id)
      if (cachedShow && cachedShow.seasons && cachedShow.seasons.length > 0) {
        console.log(cachedShow.seasons)
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
        this.showsSubject.next(cachedShows) // Update the BehaviorSubject with modified shows list
      }
    }
  }
  //---------------------------------------------------------------------------

  fetchEpisodes(seasonId: number | null): Observable<EpisodesFromApi[]> {
    return this.http.get<EpisodesFromApi[]>(
      `${this.apiUrlSeasons}/${seasonId}/episodes`
    )
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
}
