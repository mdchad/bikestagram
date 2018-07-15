import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth,
              private af: AngularFirestore,
              private activeRoute: ActivatedRoute,
              private router: Router) {
    this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/home']);
        // User is signed in.
      } else {
        this.router.navigate(['/login']);
        // No user is signed in.
      }
    });

    this.user = this.auth.authState;
  }

  public login(email, password) {
    this.auth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.router.navigate(['/home']);
        // this._isAuthenticated = true;
      })
      .catch(() => console.error('Unable to login'));
  }

  public signUp(email, password) {
    this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch(() => console.error('Unable to sign up'));
  }

  public logout() {
    this.auth.auth.signOut()
      .then(() => {
        // this.router.navigate(['/login']);
        // this._isAuthenticated = false;
      })
      .catch(() => console.error('Unable to sign out'));
  }

  public get getCurrentUser() {
    return this.auth.auth.currentUser;
  }
}
