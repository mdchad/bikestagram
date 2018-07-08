import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {UserInfo} from 'firebase';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  public userDetail: UserInfo =
    {
      displayName: null,
      email: null,
      phoneNumber: null,
      photoURL: null,
      providerId: null,
      uid: null
    };
  constructor(private af: AngularFireAuth,
              private authService: AuthService) {
    this.userProfile();
  }

  private userProfile() {
    if (this.authService.getCurrentUser) {
      this.userDetail = {
        displayName: this.af.auth.currentUser.displayName,
        email: this.af.auth.currentUser.email,
        phoneNumber: this.af.auth.currentUser.phoneNumber,
        photoURL: this.af.auth.currentUser.photoURL,
        providerId: this.af.auth.currentUser.providerId,
        uid: this.af.auth.currentUser.uid,
      };
    }
  }

  private update() {
    this.authService.getCurrentUser.updateProfile({ displayName: this.userDetail.displayName, photoURL: ''})
      .then(user => console.log('return', user))
      .catch(err => console.log(err));
  }
}
