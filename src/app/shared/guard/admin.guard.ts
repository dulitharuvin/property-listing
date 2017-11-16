import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthService } from './../../services/auth.service';
import { ROLE_ADMIN } from './../constants/constants';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUserRolesObservable
      .take(1)
      .map(roles => _.has(_.pickBy(roles, function (o) { return o == true }), ROLE_ADMIN))
      .do(authorized => {
        if (!authorized) {
          console.log('route prevented!');
          this.router.navigate(['/login']);
        }
      });
  }
}
