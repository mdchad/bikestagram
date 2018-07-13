import { ChangeDetectorRef , Component, OnInit} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public userDisplayName: string = null;
  public loggedIn = false;
  public user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth,
              private router: Router,
              private cd: ChangeDetectorRef,
              private authService: AuthService) {
    this.user = this.authService.user;
    this.user.subscribe(
      user => {
        if (user) {
          this.userDisplayName = this.authService.getCurrentUser.displayName;
        }
      },
      err => {});
  }

  public logout() {
    this.authService.logout();
  }
}
