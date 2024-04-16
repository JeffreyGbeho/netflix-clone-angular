import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { JwtTokenService } from '../../shared/services/jwt-token.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { JWT_TOKEN_KEY } from '../../shared/constants/global.constant';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const jwtService = inject(JwtTokenService);
  const storageService = inject(LocalStorageService);

  const token = storageService.getItem(JWT_TOKEN_KEY);

  if (!token || !jwtService.isTokenValid(token)) {
    authService.logout();
    return false;
  }

  return true;
};
