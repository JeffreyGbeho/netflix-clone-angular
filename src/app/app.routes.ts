import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

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
    path: 'browse',
    loadComponent: () =>
      import('./movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
