import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from './services/auth.service'

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log(inject(AuthService).loggedInVal())
  if (inject(AuthService).loggedInVal()) return true
  else {
    alert('not logged in')
    inject(Router).navigate(['/home'])
    return false
  }
}
