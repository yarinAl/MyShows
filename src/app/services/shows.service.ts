import { HttpClient } from '@angular/common/http'
import { Injectable, SecurityContext } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { BehaviorSubject, Observable, firstValueFrom, map, of, tap } from 'rxjs'
import { EpisodeFromApi } from '../interfaces/episode-from-api.interface'
import { SeasonFromApi } from '../interfaces/seasons-from-api.interface'
import { ShowFromApi } from '../interfaces/show-from-api.interface'
import { Episode, Season, Show } from '../interfaces/show.interface'

@Injectable()
export class ShowsService {
  private apiUrl = 'https://api.tvmaze.com'
  private apiUrlShows = `${this.apiUrl}/shows`
  private apiUrlSeasons = `${this.apiUrl}/seasons`
  private apiUrlEpisode = `${this.apiUrl}/episodes`

  private showsSubject = new BehaviorSubject<Show[] | null>(null)
  shows$ = this.showsSubject.asObservable()

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

  getShows(): Observable<Show[]> {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      return of(cachedShows)
    }

    return this.http.get<ShowFromApi[]>(this.apiUrlShows).pipe(
      map((shows: ShowFromApi[]) =>
        shows.map((show) => this.convertApiShowToShow(show))
      ),
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

    return this.http
      .get<ShowFromApi>(`${this.apiUrlShows}/${id}`)
      .pipe(map((show: ShowFromApi) => this.convertApiShowToShow(show)))
  }

  getSeasons(showId: number): Observable<Season[]> {
    const cachedShow = this.getCachedShow(showId)

    if (cachedShow && cachedShow.seasons && cachedShow.seasons.length > 0) {
      return of(cachedShow.seasons)
    }

    return this.http
      .get<SeasonFromApi[]>(`${this.apiUrlShows}/${showId}/seasons`)
      .pipe(
        map((seasons: SeasonFromApi[]) =>
          seasons.map((season) => this.convertApiSeasonToSeason(season))
        ),
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
        .get<EpisodeFromApi[]>(`${this.apiUrlSeasons}/${seasonId}/episodes`)
        .pipe(
          map((episodes: EpisodeFromApi[]) =>
            episodes.map((episode) => this.convertApiEpisodeToEpisode(episode))
          ),
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
    return this.http
      .get<EpisodeFromApi>(`${this.apiUrlEpisode}/${episodeId}`)
      .pipe(
        map((episode: EpisodeFromApi) =>
          this.convertApiEpisodeToEpisode(episode)
        )
      )
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
      seasons: [],
    }
  }

  private convertApiSeasonToSeason(season: SeasonFromApi): Season {
    return {
      id: season.id,
      number: season.number,
      episodes: [],
    }
  }

  private convertApiEpisodeToEpisode(episode: EpisodeFromApi): Episode {
    const summary = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      episode.summary
    )

    const imageUrl =
      episode.image && episode.image.original
        ? episode.image.original
        : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'

    return {
      id: episode.id,
      number: episode.number,
      name: episode.name,
      image: imageUrl,
      summary: summary ?? '',
    }
  }

  private getCachedShow(id: number): Show | undefined {
    const cachedShows = this.showsSubject.value

    if (cachedShows) {
      return cachedShows.find((show) => show.id === id)
    }

    return
  }
}
