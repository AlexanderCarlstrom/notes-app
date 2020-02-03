import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  toggleSignUp() {
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    signInBtn.style.display = 'block';
    signUpBtn.style.display = 'none';
    const signIn = document.getElementById('sign-in');
    const signUp = document.getElementById('sign-up');
    signIn.style.display = 'none';
    signUp.style.display = 'block';
  }

  toggleSignIn() {
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    signInBtn.style.display = 'none';
    signUpBtn.style.display = 'block';
    const signIn = document.getElementById('sign-in');
    const signUp = document.getElementById('sign-up');
    signIn.style.display = 'block';
    signUp.style.display = 'none';
  }
}
