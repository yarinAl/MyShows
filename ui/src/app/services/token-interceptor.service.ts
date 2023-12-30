import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${inject(AuthService).getToken()}`,
      },
    })
    return next.handle(tokenizedReq)
  }
}
