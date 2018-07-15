import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth-guard';
import { HomeComponent } from './component/home/home.component';
import {UserComponent} from './component/user/user.component';
import {AppComponent} from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
