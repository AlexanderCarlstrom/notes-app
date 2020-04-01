import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'localhost:3000/api/user';

  private user;
  public get User() {
    return this.user;
  }

  private avatar: string;
  public get Avatar() {
    return this.avatar;
  }

  constructor(private http: HttpClient) {
    this.loggedIn = false;
    this.avatar = 'AC';
  }

  public signin(email, password) {
    return this.http.post(this.baseUrl + '');
  }
}
