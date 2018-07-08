import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {UserInfo} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public userDisplayName: string = null;
  constructor(private af: AngularFireAuth,
              private router: Router,
              private authService: AuthService) {
  }

  public logout() {
    this.authService.logout();
  }

  public get isLoggedIn() {
    return this.authService.isAuthenticated;
  }

  private toProfile() {
    this.router.navigate(['/profile']);
  }

  private toHome() {
    this.router.navigate(['/']);
  }

  public get getUserDetail() {
    if (this.authService.getCurrentUser.displayName) {
      return this.authService.getCurrentUser.displayName;
    }

    return false;
  }
}
