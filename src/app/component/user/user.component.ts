import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {UserInfo} from 'firebase';
import {AuthService} from '../../services/auth.service';
import {finalize} from 'rxjs/internal/operators';
import * as uuid from 'uuid/v4';
import {AngularFireStorage} from 'angularfire2/storage';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  public uploadPercentage: number = null;
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
              private storage: AngularFireStorage,
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
    this.authService.getCurrentUser.updateProfile({ displayName: this.userDetail.displayName, photoURL: this.userDetail.photoURL})
      .then(user => console.log('return', user))
      .catch(err => console.log(err));
  }

  private uploadFile(event) {
    const file = event.target.files[0];
    const generateUuid = uuid();
    const filePath = generateUuid.slice(0, 13);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.percentageChanges().subscribe(percentage => {
      this.uploadPercentage = percentage;
    }, err => {
      console.error(err);
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        const s = fileRef.getDownloadURL();
        s.subscribe(url => {
          this.userDetail.photoURL = url;
        });
      })
    ).subscribe();
  }
}
