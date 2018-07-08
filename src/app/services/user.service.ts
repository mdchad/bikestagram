import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import User from '../interface/user.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private auth: AngularFireAuth,
              private http: HttpClient,
              private router: Router) {}

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user: Observable<User> = this._user.asObservable();
}
