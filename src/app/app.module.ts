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
import { AddPostComponent, HomeComponent } from './component/home/home.component';
// Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';


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
    UserComponent,
    AddPostComponent
  ],
  entryComponents: [
    AddPostComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
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
