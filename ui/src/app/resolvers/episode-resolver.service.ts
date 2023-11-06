import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { Episode } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

export const EpisodeResolverService: ResolveFn<Episode> = async (
  route: ActivatedRouteSnapshot
) => {
  const episode = await firstValueFrom(
    inject(ShowsService).getEpisode(Number(route.paramMap.get('id')))
  )

  const image = await fetch(episode.image)
  const imageBlob = await image.blob()
  const imageObjectUrl = URL.createObjectURL(imageBlob)

  episode.image = imageObjectUrl

  return episode
}
