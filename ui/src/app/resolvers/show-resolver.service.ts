import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { Episode, Season, Show } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

interface data {
  show: Show | null
  seasons: Season[] | null
  episodes: Episode[] | null
}
export const ShowResolverService: ResolveFn<data> = async (
  route: ActivatedRouteSnapshot
) => {
  console.log('show resolver')
  const showsService = inject(ShowsService)

  const showId = Number(route.paramMap.get('id'))
  const seasonId = route.paramMap.get('seasonId')

  const show = await firstValueFrom(showsService.getShow(showId))
  const seasons = await firstValueFrom(showsService.getSeasons(showId))

  const episodesOfFirstSeason = await firstValueFrom(
    showsService.getEpisodes(
      seasonId ? Number(seasonId) : Number(seasons[0].id)
    )
  )

  return {
    show: show,
    seasons: seasons,
    episodes: episodesOfFirstSeason,
  }
}
