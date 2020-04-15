import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  // http functions
  public login(userEmail, userPassword) {
    const body = {
      email: userEmail,
      password: userPassword,
    };
    return this.http.post(this.baseUrl + '/login', body).pipe(
      tap((res) => {
        this.setTokens(res);
      }),
      catchError((err) => of(err))
    );
  }

  // login with token and id
  public loginWithToken() {
    const headers = new HttpHeaders()
      .set('access-token', this.getAccessToken())
      .set('refresh-token', this.getRefreshToken());
    return this.http.get(this.baseUrl + '/token', { headers });
  }

  // helper functions
  // set access token to local storage
  setAccessToken(token) {
    localStorage.setItem('access-token', token);
  }

  // set refresh token
  setRefreshToken(token) {
    localStorage.setItem('refresh-token', token);
  }

  private setTokens(tokens) {
    if (!tokens.success) {
      return;
    }
    localStorage.setItem('access-token', tokens.accessToken);
    localStorage.setItem('refresh-token', tokens.refreshToken);
  }

  // handle errors
  private handleErrors(err) {
    console.log(err);
  }

  private getAccessToken() {
    return localStorage.getItem('access-token');
  }

  private getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }
}
