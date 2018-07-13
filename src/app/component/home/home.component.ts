import { Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import Bike from '../../interface/bike.interface';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from 'angularfire2/storage';
import {finalize} from 'rxjs/internal/operators';

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
  uploadPercentage: Observable<number>;

  constructor(private db: AngularFirestore,
              private af: AngularFireAuth,
              private route: ActivatedRoute,
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
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    console.log(task.percentageChanges().subscribe(ref => console.log(ref)));

    task.snapshotChanges().pipe(
      finalize(() => {
        const s = fileRef.getDownloadURL();
        console.log(s.subscribe(r => console.log(r)));
      })
    ).subscribe();
  }
}
