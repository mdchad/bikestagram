import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';


// Component
import { LoginComponent } from './component/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
// Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app-routing.module';
import {AuthGuard} from './guards/auth-guard';
import {AuthService} from './services/auth.service';
import {UserComponent} from './component/user/user.component';


const firebaseConfig = {
  apiKey: 'AIzaSyC3GR4MPKznjsJUXYfVQEmSzuVyqWwhpbc',
    authDomain: 'bikestagram-1.firebaseapp.com',
    databaseURL: 'https://bikestagram-1.firebaseio.com',
    projectId: 'bikestagram-1',
    storageBucket: 'bikestagram-1.appspot.com',
    messagingSenderId: '682535928393'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
