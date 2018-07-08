import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth-guard';
import { HomeComponent } from './component/home/home.component';
import {UserComponent} from './component/user/user.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
