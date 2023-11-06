import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { Show } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

export const ShowResolverService: ResolveFn<Show> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ShowsService).getShow(Number(route.paramMap.get('id')))
}
