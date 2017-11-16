import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './../models/User';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'

@Injectable()
export class UserService {

  user: User = null;
  userRoles: Array<string>;
  authstateRegister: firebase.User = null;
  authState: firebase.User = null;
  userRef: AngularFireObject<any>;
  userRefLogedIn: AngularFireObject<any>;
  rolesRefLogedIn: AngularFireObject<any>;

  constructor(private firebaseAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private router: Router) {

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get registeredUserUid(): string {
    return this.authstateRegister != null ? this.authstateRegister.uid : '';
  }

  registerUser(user: User) {
    this.user = user;
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        this.authstateRegister = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }

  signOut(): void {
    this.firebaseAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.registeredUserUid}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.fireDb.object(path);

    userRef.update(this.user)
      .catch(error => console.log(error));
  }

  public getAllUsers() {
    var lecturers = this.fireDb.list<User>('users').valueChanges();
    return lecturers;
  }
}