import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Show } from '../interfaces/show.interface'
import { ShowsService } from '../services/shows.service'

@Injectable({
  providedIn: 'root',
})
export class ShowResolverService {
  constructor(private service: ShowsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Show> {
    return this.service.getShow(Number(route.paramMap.get('id')))
  }
}
