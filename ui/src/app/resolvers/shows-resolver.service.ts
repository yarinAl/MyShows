import { Injectable } from '@angular/core'
import { Observable, firstValueFrom } from 'rxjs'
import { Show } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

@Injectable({
  providedIn: 'root',
})
export class ShowsResolverService {
  constructor(private service: ShowsService) {}

  async resolve(): Promise<Observable<Show[]> | Promise<Show[]> | Show[]> {
    const shows = await firstValueFrom(this.service.getShows(24))

    const imageUrls = shows.map((show) => show.image)
    const imagesPromises = imageUrls.map((imageUrl) => fetch(imageUrl))
    const imagesData = await Promise.all(imagesPromises)
    const blobsPromises = imagesData.map((imageData) => imageData.blob())
    const blobs = await Promise.all(blobsPromises)

    return shows.map((show, index) => {
      const imgObjUrl = URL.createObjectURL(blobs[index])

      return {
        ...show,
        image: imgObjUrl,
      }
    })
  }
}

// export const RouteResolver: ResolveFn<any> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<{}> => {
//   const usersListService = inject(ShowsService)
// }
//   );

//   // https://www.positronx.io/angular-route-resolvers/
