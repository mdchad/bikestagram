import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import User from '../../interface/user.interface';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent  {
  public user: User = { name: null, email: null, password: null, profilePicture: null};

  constructor(private af: AngularFirestore,
              private as: AngularFireStorage,
              private authService: AuthService) {}

  private onSignUp() {
    this.authService.signUp(this.user.email, this.user.password);
  }

  private onLogin() {
    this.authService.login(this.user.email, this.user.password);
  }
}
