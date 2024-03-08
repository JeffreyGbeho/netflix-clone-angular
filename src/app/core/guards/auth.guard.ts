import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (!token || !authService.isTokenValid(token)) {
    localStorage.removeItem('JWT_TOKEN');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
