import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Show } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

@Injectable({
  providedIn: 'root',
})
export class ShowsResolverService {
  constructor(private service: ShowsService) {}

  resolve(): Observable<Show[]> | Promise<Show[]> | Show[] {
    return this.service.getShows()
  }
}
