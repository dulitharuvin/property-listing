import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(public fireAuth: AngularFireAuth) {

  }

  login(){
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

}
