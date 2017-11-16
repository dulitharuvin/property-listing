import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('userSaveForm') userSignUpForm: any;
  user: User;  

  constructor(private userService: UserService, private router: Router) {
    
  }

  ngOnInit() {
    this.user = new User();
  }

  registerUser() {
    const userSavePromise = this.userService.registerUser(this.user);
    userSavePromise
    .then(_ => {
      console.log('success');
      this.userSignUpForm.reset();
      this.router.navigate(['/user-list']);
    });
  }

}
