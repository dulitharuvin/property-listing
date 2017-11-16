import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showError: boolean;
  error: string;


  constructor(public router: Router,
    private authService: AuthService) {

  }

  ngOnInit() {
  }

  loginUser() {
    this.authService.emailLogin(this.email, this.password).then(response => {
      localStorage.setItem('isLoggedin', 'true');
      this.router.navigate(['/listings']);
    })
      .catch(error => this.handleError(error));
  }

  handleError(error: any) {
    this.error = error.message;
    this.showError = true;
  }

}
