import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.login('caa.alexander@gmail.com', '1234567').subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.auth.setAccessToken(data.accessToken);
        this.auth.setRefreshToken(data.successToken);
        this.router.navigateByUrl('/list');
      } else {
        this.showError(data.message);
      }
    });
  }

  showError(message) {
    const error = document.getElementById('form-error');
    error.style.display = 'block';
    error.innerHTML = message;
  }

  focusInput(id) {
    document.getElementById(id).focus();
  }

  get form() {
    return this.userForm.controls;
  }

  onSubmit() {}
}
