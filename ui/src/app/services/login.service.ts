import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../interfaces/user.interface'

@Injectable()
export class LoginService {
  private apiUrl = 'http://localhost:3000'
  private apiUrlLogin = `${this.apiUrl}/login`

  constructor(private http: HttpClient) {}

  login(email: string, passowrd: string): Observable<User> {
    return this.http.post<User>(this.apiUrlLogin, { email, passowrd })
  }
}
