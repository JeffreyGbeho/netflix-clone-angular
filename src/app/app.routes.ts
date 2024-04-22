import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { ManageProfileComponent } from './pages/profile/components/manage-profile/manage-profile.component';
import { CreateProfileComponent } from './pages/profile/components/create-profile/create-profile.component';
import { EditProfileComponent } from './pages/profile/components/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: 'profiles', redirectTo: '/profiles/manage', pathMatch: 'full' },
  {
    path: '',
    redirectTo: '/browse',
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
      {
        path: 'edit/:id',
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./pages/browser/browser.component').then(
        (m) => m.BrowserComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'watch/:id',
    loadComponent: () =>
      import('./pages/watch-movie/watch-movie.component').then(
        (m) => m.WatchMovieComponent
      ),
    canActivate: [authGuard],
  },
];
