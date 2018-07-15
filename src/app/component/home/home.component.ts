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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  bikesCol: AngularFirestoreCollection<Bike>;
  bikes: Observable<Bike[]>;
  user: Observable<firebase.User>;
  userBike: Bike[] = [];
  name: string = null;
  uploadPercentage: Observable<number>;
  // @ViewChild('addDialog') addDialog: AddPostComponent;
  addDialog: AddPostComponent;

  constructor(private db: AngularFirestore,
              private af: AngularFireAuth,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private storage: AngularFireStorage) {
    this.user = this.af.authState;
    route.params.subscribe(val => {
      this.bikesCol = this.db.collection('bikes');
      this.bikes = this.bikesCol.valueChanges();
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

  private uploadFile(event) {
    const file = event.target.files[0];
    const generateUuid = uuid();
    const filePath = generateUuid.slice(0, 13);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // console.log(task.percentageChanges().subscribe(ref => console.log(ref)));

    task.snapshotChanges().pipe(
      finalize(() => {
        const s = fileRef.getDownloadURL();
        console.log(s.subscribe(r => console.log(r)));
      })
    ).subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '1050px',
      data: {name: this.name }
    });

    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  templateUrl: '../add-post/add-post.component.html',
  styleUrls: ['../add-post/add-post.component.scss']
})

export class AddPostComponent {
  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
