import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { ShowsService } from '../services/shows.service'

export const SeasonResolverService: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const showsService = inject(ShowsService)
  const seasonId = Number(route.paramMap.get('seasonId'))

  const episodes = await firstValueFrom(showsService.getEpisodes(seasonId))

  return {
    episodes: episodes,
  }
}
