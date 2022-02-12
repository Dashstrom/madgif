import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuth(): boolean {
    return this.getToken() != null;
  }

  getToken(): string|null {
    return sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    if (this.isAuth())
      this.delToken();
    return sessionStorage.setItem('token', token);
  }

  delToken(): void {
    return sessionStorage.removeItem('token');
  }


  login(username: string, password: string): Observable<void> {
    return new Observable(o => {
      this.http.post(API + "/auth/login", { username, password }).subscribe(
        res => {
          this.setToken(res['token']);
          o.next();
        },
        err => o.error(err),
        () => o.complete()
      );
    });
  }

  register(username: string, password: string): Observable<void> {
    return new Observable(o => {
      this.http.post(API + "/auth/register", { username, password }).subscribe(
        res => {
          this.setToken(res['token']);
          o.next();
        },
        err => o.error(err),
        () => o.complete()
      );
    });
  }

  logout(): void {
    this.delToken();
  }
}
