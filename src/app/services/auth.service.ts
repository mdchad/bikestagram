import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class AuthService {
  private _isAuthenticated: boolean = null;
  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  constructor(private auth: AngularFireAuth,
              private af: AngularFirestore,
              private router: Router) {}

  public login(email, password) {
    this.auth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['/']);
        this._isAuthenticated = true;
      })
      .catch(() => console.error('Unable to login'));
  }

  public signUp(email, password) {
    this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        this._isAuthenticated = true;
      })
      .catch(() => console.error('Unable to sign up'));
  }

  public logout() {
    this.auth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
        this._isAuthenticated = false;
      })
      .catch(() => console.error('Unable to sign out'));
  }

  public get getCurrentUser() {
    return this.auth.auth.currentUser;
  }
}
