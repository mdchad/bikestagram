import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import Bike from '../../interface/bike.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  bikesCol: AngularFirestoreCollection<Bike>;
  bikes: Observable<Bike[]>;
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.bikesCol = this.db.collection('bikes');
    this.bikes = this.bikesCol.valueChanges();
  }
}
