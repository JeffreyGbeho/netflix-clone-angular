import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { JWT_TOKEN_KEY } from '../../shared/constants/global.constant';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(LocalStorageService);

  const token = storageService.getItem(JWT_TOKEN_KEY);

  if (token && !req.url.includes(environment.endpoints.auth)) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(authReq);
  }
  return next(req);
};
