import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { AddProfilComponent } from './add-profil/add-profil.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "profiles",
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: "profiles/create",
    component: AddProfilComponent,
    canActivate: [authGuard]
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];
