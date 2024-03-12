import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { ManageProfileComponent } from './pages/profile/components/manage-profile/manage-profile.component';
import { CreateProfileComponent } from './pages/profile/components/create-profile/create-profile.component';

export const routes: Routes = [
  { path: 'profiles', redirectTo: '/profiles/manage', pathMatch: 'full' },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
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
      {
        path: 'add',
        component: CreateProfileComponent,
      },
    ],
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
    canActivate: [authGuard],
  },
];
