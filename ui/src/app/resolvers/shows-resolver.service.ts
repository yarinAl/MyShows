import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { Show } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

export const ShowsResolverService: ResolveFn<Show[]> = async () => {
  const shows = await firstValueFrom(inject(ShowsService).getShows(24))
  const imageUrls = shows.map((show) => show.image)
  const imagesPromises = imageUrls.map((imageUrl) => fetch(imageUrl ?? ''))
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
