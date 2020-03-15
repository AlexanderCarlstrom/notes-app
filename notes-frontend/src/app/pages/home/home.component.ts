import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  avatar: string;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.avatar = this.auth.Avatar;
  }

  isLoggedIn() {
    return this.auth.LoggedIn;
  }
}
