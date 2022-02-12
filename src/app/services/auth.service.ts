import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants';

declare const Buffer;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuth(): boolean {
    const claims = this.getClaims();
    if (claims != null) {
      const { public_id, exp } = claims;
      const now = Math.floor(Date.now()/1000);
      return now < exp;
    }
    return false;
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

  getClaims(): any|null {
    const token = this.getToken();
    if (token) {
      const b64Payload = token.split(".", 3)[1];
      const JSONpayload = Buffer.from(b64Payload, 'base64').toString('binary');
      const payload = JSON.parse(JSONpayload);
      return payload;
    }
    return null;
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
