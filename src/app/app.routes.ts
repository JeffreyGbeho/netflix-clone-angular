import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profiles',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profiles/create',
    loadComponent: () =>
      import('./create-profile/create-profile.component').then(
        (m) => m.CreateProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
