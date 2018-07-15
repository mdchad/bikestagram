import { Component, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import Bike from '../../interface/bike.interface';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/internal/operators';
import * as uuid from 'uuid/v4';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  bikesCol: AngularFirestoreCollection<Bike>;
  bikes: Observable<Bike[]>;
  userProfilePic: string;
  userBike: Bike[] = [];
  bike: Bike = {
    name: '',
    capacity: null,
    caption: '',
    photoUrl: '',
    userName: '',
    profilePic: ''
  };
  constructor(private db: AngularFirestore,
              private af: AngularFireAuth,
              private route: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog) {
    this.userProfilePic = this.af.auth.currentUser.photoURL;
    this.route.paramMap.subscribe(val => {
      if (this.route.routeConfig.path === 'home') {
        this.bikesCol = this.db.collection('bikes');
        this.bikes = this.bikesCol.valueChanges();
      }
    }, err => {
    });

    this.bikes.subscribe(
      res => {
        if (res) {
          this.userBike = res;
        }
        return;
      },
      err => {
        console.error('Unable to fetch bikes');
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '1050px',
      data: {
        name: this.bike.name,
        capacity: this.bike.capacity,
        caption: this.bike.caption,
        photoUrl: this.bike.photoUrl,
        userName: this.bike.userName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bikesCol.add(result)
        .then(bike => console.log(bike))
        .catch(err => console.error('Fail to submit post', err));
      console.log('The dialog was closed');
    });
  }

  public get get100cc()  {
    return this.userBike.filter(bike => bike.capacity > 400);
  }
  public get get400cc()  {
    return this.userBike.filter(bike => bike.capacity < 400 && bike.capacity > 200);
  }
  public get get200cc()  {
    return this.userBike.filter(bike => bike.capacity < 200);
  }
  public get getDefault()  {
    return this.userBike;
  }
}

@Component({
  templateUrl: '../add-post/add-post.component.html',
  styleUrls: ['../add-post/add-post.component.scss']
})

export class AddPostComponent {
  uploadPercentage: number = null;

  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              public dialogRef: MatDialogRef<AddPostComponent>,
              @Inject(MAT_DIALOG_DATA) public bike: Bike) {
    this.bike.userName = this.authService.getCurrentUser.displayName;
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
          this.bike.photoUrl = url;
          this.bike.profilePic = this.authService.getCurrentUser.photoURL;
        });
      })
    ).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // private submitPost() {
  // }
}
