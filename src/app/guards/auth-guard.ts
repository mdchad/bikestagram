import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private af: AngularFireAuth,
              private router: Router) {}

  canActivate() {
    if (this.af.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
