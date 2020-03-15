import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean;
  public get LoggedIn() {
    return this.loggedIn;
  }

  private avatar: string;
  public get Avatar() {
    return this.avatar;
  }

  constructor() {
    this.loggedIn = false;
    this.avatar = 'AC';
  }
}
