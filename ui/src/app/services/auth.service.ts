import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'
  private apiUrlRegister = `${this.apiUrl}/register`
  private apiUrlLogin = `${this.apiUrl}/login`
  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  )

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post<any>(this.apiUrlRegister, user)
  }

  login(user: any) {
    this.loggedIn.next(true)
    return this.http.post<any>(this.apiUrlLogin, user)
  }

  loggedInVal() {
    return !!localStorage.getItem('token')
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable()
  }
  getToken() {
    return localStorage.getItem('token')
  }
}
