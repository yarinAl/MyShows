import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable, firstValueFrom } from 'rxjs'
import { Episode } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

@Injectable({
  providedIn: 'root',
})
export class EpisodeResolverService {
  constructor(private service: ShowsService) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<Observable<Episode> | Promise<Episode> | Episode> {
    const episode = await firstValueFrom(
      this.service.getEpisode(Number(route.paramMap.get('id')))
    )

    const image = await fetch(episode.image)
    const imageBlob = await image.blob()
    const imageObjectUrl = URL.createObjectURL(imageBlob)

    episode.image = imageObjectUrl

    return episode
  }
}
