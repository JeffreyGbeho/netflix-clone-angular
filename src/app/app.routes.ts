import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { ManageProfileComponent } from './pages/profile/components/manage-profile/manage-profile.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'profiles',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'manage',
        component: ManageProfileComponent,
      },
    ],
  },
  {
    path: 'profiles/create',
    loadComponent: () =>
      import(
        './pages/profile/components/create-profile/create-profile.component'
      ).then((m) => m.CreateProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
    canActivate: [authGuard],
  },
  { path: 'profiles', redirectTo: '/profiles/manage', pathMatch: 'full' },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
